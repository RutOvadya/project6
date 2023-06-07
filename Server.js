const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Database connection
const db = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '2424',
database: 'project6',
});

db.connect((err) => {
if (err) {
    console.error('Error connecting to the database: ', err);
    return;
}
console.log('Connected to the database');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes

// GET all users
app.get('/users', (req, res) => {
const sql = 'SELECT * FROM users';
db.query(sql, (err, results) => {
    if (err) {
    console.error('Error executing the query: ', err);
    return res.status(500).json({ error: 'An error occurred' });
    }
    res.json(results);
});
});

// POST a new user
app.post('/users', (req, res) => {
const { name, email } = req.body;
const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
db.query(sql, [name, email], (err, result) => {
    if (err) {
    console.error('Error executing the query: ', err);
    return res.status(500).json({ error: 'An error occurred' });
    }
    res.status(201).json({ message: 'User created successfully' });
});
});

// PUT (update) a user
app.put('/users/:id', (req, res) => {
const userId = req.params.id;
const { name, email } = req.body;
const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
db.query(sql, [name, email, userId], (err, result) => {
    if (err) {
    console.error('Error executing the query: ', err);
    return res.status(500).json({ error: 'An error occurred' });
    }
    res.json({ message: 'User updated successfully' });
});
});

// DELETE a user
app.delete('/users/:id', (req, res) => {
const userId = req.params.id;
const sql = 'DELETE FROM users WHERE id = ?';
db.query(sql, [userId], (err, result) => {
    if (err) {
    console.error('Error executing the query: ', err);
    return res.status(500).json({ error: 'An error occurred' });
    }
    res.json({ message: 'User deleted successfully' });
});
});

// Implement similar CRUD operations for other routes (posts, todos, comments, usersPass)

// Start the server
app.listen(port, () => {
console.log(`Server running on port ${port}`);
});


// // Gracefully handle termination signals
// process.on('SIGINT', () => {
//     console.log('Received SIGINT signal. Closing server gracefully...');
//     server.close(() => {
//       console.log('Server closed.');
//       process.exit();
//     });
//   });
