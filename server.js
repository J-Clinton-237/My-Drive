// Calling Dependencies
const { json } = require('body-parser');
const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const app = express();
const path = require('path');
const fs = require('fs');

// CORS configuration - allow React app to communicate with server
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Allow JSON from frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));    

//session set up
app.use(session({
    secret: 'i hate this',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: 'lax'
     }

}))

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userDir = path.join(__dirname, 'uploads', req.session.user.id.toString());
        require('fs').mkdirSync(userDir, { recursive: true });
        cb(null, userDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// MySQL DB connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0000',
    database: 'auth_db'
});
// Requesting Connection to Mysql
db.connect(err => {
    if (err) {
        console.log('DB error:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

//LOGIN VERIFICATION
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';

    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.log("Database error")
            return res.json({ success: false });
        }
        {   const user = results[0];
            if (results.length > 0) {
                req.session.user = {
                id: user.id,
                name: user.name,
                email: user.email
                }
                res.json({ success: true, id:results[0].id });
            } else {

                res.json({ success: false });
            }
            //console.log(req.session);
           // console.log(user); 
        }
    });
});

//Get logged in user
app.get('/me', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: "Not Logged in " });
    }
    const sql = ` 
    SELECT u.id, u.name, u.email, d.theme,
    d.profile_pic, d.notifications
    FROM users u
    JOIN data d ON u.id = d.user_id
    WHERE u.id = ?
    `;
    db.query(sql, [req.session.user.id],
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'DB error' });
            }
            res.json(results[0]);

        });
    console.log("Session: ", req.session);
});

//Log out route
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.join({ success: false });
        res.clearCookie('connect.sid');
        res.json({ success: true });
    })
})

// SIGNING UP NEW USER
app.post('/signup', (req, res) => {
    const { email, password, name } = req.body;
    // Check if user already exists
    const checkSql = 'SELECT * FROM users WHERE email = ?';
    db.query(checkSql, [email], (err, result) => {
        if ( result.length > 0) {
            return res.json({ message: 'Email already exists' });
        }
        console.log('pass');
        // Add New User 
        const insertSql = 'INSERT INTO users ( email, password, name) VALUES (?, ?, ?)';
        db.query(insertSql, [email, password, name], err => {
            if (err) {
                alert("Failed");
                return res, json({ message: 'SignUp Failed' });
            }
            res.json({ message: "Success" });
            
        });
        //insert into data table
        db.query(checkSql, [email], (err, result) => {
        const userId = result[0].id;
        const sqlData = ' INSERT INTO data (user_id, profile_pic, theme, notifications) VALUES (?, ?, ?, ?)';
        db.query(sqlData, [userId, 'default.png', 'light', true],
            (err, result) => {
                if (err) return console.log("DATA INSERT ERROR:", err);
                console.log("User Account Created");
            });
        });
        
    });
});

// File upload
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    res.json({ message: 'File uploaded successfully', filename: req.file.filename });
});

// Get user files
app.get('/files', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Not authenticated' });
    }
    const fs = require('fs');
    const userDir = path.join(__dirname, 'uploads', req.session.user.id.toString());
    
    if (!fs.existsSync(userDir)) {
        return res.json([]);
    }
    
    const files = fs.readdirSync(userDir).map(filename => {
        const filePath = path.join(userDir, filename);
        const stats = fs.statSync(filePath);
        return {
            filename,
            size: stats.size,
            type: require('mime-types').lookup(filename) || 'application/octet-stream',
            uploaded_at: stats.birthtime
        };
    });
    
    res.json(files);
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Update user settings
app.put('/settings', (req, res) => {
    console.log('PUT /settings route hit');
    if (!req.session.user) {
        console.log('No session user');
        return res.status(401).json({ error: "Not logged in" });
    }

    const { theme, profile_pic } = req.body;
    console.log('Request body:', req.body);
    console.log('Updating settings for user', req.session.user.id, ':', { theme, profile_pic });
    
    const sql = 'UPDATE data SET theme = ?, profile_pic = ? WHERE user_id = ?';
    
    db.query(sql, [theme, profile_pic, req.session.user.id], (err, result) => {
        if (err) {
            console.error('Error updating settings:', err);
            return res.status(500).json({ error: 'Failed to update settings' });
        }
        console.log('Settings updated successfully, affected rows:', result.affectedRows);
        res.json({ message: 'Settings updated successfully' });
    });
});

// Test GET route for settings
app.get('/settings', (req, res) => {
    console.log('GET /settings route hit');
    res.json({ message: 'Settings endpoint works' });
});

// Delete user file
app.delete('/files/:filename', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    const filename = req.params.filename;
    const userDir = path.join(__dirname, 'uploads', req.session.user.id.toString());
    const filePath = path.join(userDir, filename);

    // Check if file exists and belongs to user
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'File not found' });
    }

    // Delete the file
    try {
        fs.unlinkSync(filePath);
        console.log(`File deleted: ${filePath}`);
        res.json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).json({ error: 'Failed to delete file' });
    }
});

// Root route - serve login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Serve front end
app.use(express.static('public'));

// Run Server
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});