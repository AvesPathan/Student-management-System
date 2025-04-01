const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2110',
    database: 'student_management'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// User Login API
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) return res.status(401).send("Invalid username or password");
        res.json({ message: "Login successful" });
    });
});

// User Registration (Sign Up) API
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Check if the username already exists
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length > 0) return res.status(400).send("Username already taken");

        // Insert new user into the database
        db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ message: "Account created successfully" });
        });
    });
});


// CRUD APIs for Students
app.get('/students', (req, res) => {
    db.query('SELECT * FROM students', (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.post('/students', (req, res) => {
    const { rollno, name, email, phone, course, address } = req.body;
    db.query('INSERT INTO students (rollno, name, email, phone, course, address) VALUES (?, ?, ?, ?, ?, ?)',
        [rollno, name, email, phone, course, address], (err, result) => {
            if (err) throw err;
            res.json({ message: "Student added successfully" });
        });
});

app.put('/students/:id', (req, res) => {
    const {rollno, name, email, phone, course, address } = req.body;
    db.query('UPDATE students SET rollno=?, name=?, email=?, phone=?, course=?, address=? WHERE id=?',
        [rollno, name, email, phone, course, address, req.params.id], (err, result) => {
            if (err) throw err;
            res.json({ message: "Student updated successfully" });
        });
});

app.delete('/students/:id', (req, res) => {
    db.query('DELETE FROM students WHERE id=?', [req.params.id], (err, result) => {
        if (err) throw err;
        res.json({ message: "Student deleted successfully" });
    });
});

// Start Server
app.listen(5000, () => console.log('Server running on port 5000'));
