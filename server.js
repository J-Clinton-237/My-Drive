// Calling Dependencies
const { json } = require('body-parser');
const express = require('express');
const mysql = require('mysql2');
const app = express();

// Allow JSON from frontend
app.use(express.json());

// Serve front end
app.use(express.static('public'));

// MySQL connection
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
    
        {
            if (results.length > 0) {
                res.json({ success: true });
            } else {
                res.json({ success: false });
            }

        }
    });
});

// SIDNING UP NEW USER
app.post('/signup', (req, res) => {
    const { email, password } = req.body;

    // Check if user already exists
    const checkSql = 'SELECT * FROM users WHERE email = ?';
    db.query(checkSql, [email], (err, result) => {
        if ( result.length > 0) {
            return res.json({ message: 'Email already exists' });
        }
        // Add New User 
        const insertSql = 'INSERT INTO users (email, password) VALUES (?, ?)';
        db.query(insertSql, [email, password], err => {
            if (err) {
                return res, json({ message: 'SignUp Failed' });
            }
            res.json({ message: "Success" });
        });
    });
});

// Run Server
app.listen(3000, () => {
    console.log('Server running on, copy http://localhost:3000/login.html and paste in your Browser');
});