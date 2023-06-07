const express = require('express');
const router = express.Router();

// // GET /users
// router.get('/', (req, res) => {
//   // Logic to fetch all users
// });

// // POST /users
// router.post('/', (req, res) => {
//   // Logic to create a new user
// });

// GET all users

router.get('/', (req, res) => {
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
  router.post('/', (req, res) => {
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
  router.put('/', (req, res) => {
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
  router.delete('/', (req, res) => {
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

module.exports = router;



