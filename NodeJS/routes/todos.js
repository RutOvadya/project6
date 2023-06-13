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

// Get all todos of userId
router.get('/:userId', (req,res) => {
    const userId = req.params.userId;
  db.query('SELECT * FROM todos WHERE userId = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error getting todos: ', err);
      res.status(500).json({ error: 'Error getting todos' });
      return;
    }
    res.json(results);
  });
});

// Get a specific todo of userId
router.get('/:userId/:id', (req, res) => {
    const userId = req.params.userId;
  const todoId = req.params.id;
  db.query('SELECT * FROM todos WHERE id = ? AND userId = ?', [todoId ,userId], (err, results) => {
    if (err) {
      console.error('Error retrieving todo: ', err);
      res.status(500).json({ error: 'Error retrieving todo' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }
    const todo = results[0];
    res.json({ todo });
  });
});


// Create a new todo for userId
router.post('/:userId', (req, res) => {
  const userId = req.params.userId;
  const { title, completed } = req.body;
  db.query('INSERT INTO todos (userId ,title, completed) VALUES (?, ?, ?)', [userId ,title, completed], (err, results) => {
    if (err) {
      console.error('Error creating todo: ', err);
      res.status(500).json({ error: 'Error creating todo' });
      return;
    }
    res.json({ message: 'Todo created successfully' });
  });
});


// Update a todo
router.put('/:userId/:id', (req, res) => {
    const userId = req.params.userId;
  const todoId = req.params.id;
  const { title, completed } = req.body;
  db.query('UPDATE todos SET title = ?, completed = ? WHERE id = ? AND userId = ?', [title, completed, todoId, userId], (err, results) => {
  if (err) {
    console.error('Error updating todo: ', err);
    res.status(500).json({ error: 'Error updating todo' });
    return;
  }
  res.json({ message: 'Todo updated successfully' });
  });
});

// Delete a todo
router.delete('/:userId/:id', (req, res) => {
    const userId = req.params.userId;
    const todoId = req.params.id;
  db.query('DELETE FROM todos WHERE id = ? AND userId = ?', [todoId,userId], (err, results) => {
    if (err) {
      console.error('Error deleting todo: ', err);
      res.status(500).json({ error: 'Error deleting todo' });
      return;
    }
    res.json({ message: 'Todo deleted successfully' });
  });
});

module.exports = router;


