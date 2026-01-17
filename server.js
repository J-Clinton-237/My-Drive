// Calling Dependencies
const { json } = require('body-parser');
const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const app = express();
const path = require('path');

// Allow JSON from frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));    

// Serve front end
app.use(express.static('public'));

//session set up
app.use(session({
    secret: 'i hate this',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true
     }

}))

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

// Run Server
app.listen(3000, () => {
    console.log('Server running on, copy http://localhost:3000/login.html and paste in your Browser');
});