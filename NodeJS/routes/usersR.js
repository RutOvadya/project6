const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '2424',
  database: 'project6',
});

// Get all records of username and password
router.get('/', (req,res) => {
  db.query('SELECT * FROM usersR', (err, results) => {
    if (err) {
      console.error('Error getting records of username and password: ', err);
      res.status(500).json({ error: 'Error getting records of username and password' });
      return;
    }
    res.json(results);
  });
});

// Get a specific record of username and password
router.get('/:username/:password', (req, res) => {
    const username = req.params.username;
    const password = req.params.password;
  db.query('SELECT * FROM usersR WHERE name = ? AND password = ?', [username ,password], (err, results) => {
    if (err) {
      console.error('Error retrieving record of username and password: ', err);
      res.status(500).json({ error: 'Error retrieving record of username and password' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Record of username and password not found' });
      return;
    }
    const username_password = results[0];
    res.json({ username_password });
  });
});

// Create a new record of username and password
router.post('/', (req, res) => {
  const { username, password } = req.body;
  db.query('INSERT INTO usersR (name, password) VALUES (?, ?)', [username, password], (err, results) => {
    if (err) {
      console.error('Error creating record of username and password: ', err);
      res.status(500).json({ error: 'Error creating record of username and password' });
      return;
    }
    res.json({ message: 'Record of username and password created successfully' });
  });
});

// Update a record of username and password
router.put('/:username/:password', (req, res) => {
    const beforeUsername = req.params.username;
    const beforePassword = req.params.password;
  const { username, password } = req.body;
  db.query('UPDATE usersR SET name = ?, password = ? WHERE name = ? AND password = ?', [username, password, beforeUsername, beforePassword], (err, results) => {
  if (err) {
    console.error('Error updating record of username and password: ', err);
    res.status(500).json({ error: 'Error updating record of username and password' });
    return;
  }
  res.json({ message: 'Record of username and password updated successfully' });
  });
});

// Delete a record of username and password
router.delete('/:username/:password', (req, res) => {
    const username = req.params.username;
    const password = req.params.password;
  db.query('DELETE FROM usersR WHERE name = ? AND password = ?', [username, password], (err, results) => {
    if (err) {
      console.error('Error deleting record of username and password: ', err);
      res.status(500).json({ error: 'Error deleting record of username and password' });
      return;
    }
    res.json({ message: 'Record of username and password deleted successfully' });
  });
});

module.exports = router;

// Update a record of username and password by ID אם נצטרך בהמשך
// router.put('/:id', (req, res) => {
//     const id = req.params.id
//   const { username, password } = req.body;
//   db.query('UPDATE usersR SET name = ?, password = ? WHERE id= ?', [username, password, id], (err, results) => {
//   if (err) {
//     console.error('Error updating record of username and password: ', err);
//     res.status(500).json({ error: 'Error updating record of username and password' });
//     return;
//   }
//   res.json({ message: 'Recorddddd of username and password updated successfully' });
//   });
// });
