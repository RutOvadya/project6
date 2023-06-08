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

// Get all posts
router.get('/:id', (req,res) => {
    const userId = req.params.id;
  db.query('SELECT * FROM posts WHERE userId = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error getting posts: ', err);
      res.status(500).json({ error: 'Error getting posts' });
      return;
    }
    res.json(results);
  });
});

// Get a specific post by ID
router.get('/:id/:postId', (req, res) => {
  const postId = req.params.postId;
  const userId = req.params.id;
  db.query('SELECT * FROM posts WHERE id = ? AND userID = ?', [postId ,userId], (err, results) => {
    if (err) {
      console.error('Error retrieving post: ', err);
      res.status(500).json({ error: 'Error retrieving post' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    const post = results[0];
    res.json({ post });
  });
});


// Create a new post
router.post('/', (req, res) => {
  const { userId, title, body } = req.body;
  db.query('INSERT INTO posts (userId, title, body) VALUES (?, ?, ?)', [userId, title, body], (err, results) => {
    if (err) {
      console.error('Error creating post: ', err);
      res.status(500).json({ error: 'Error creating post' });
      return;
    }
    res.json({ message: 'Post created successfully' });
  });
});


// Update a post
router.put('/:id', (req, res) => {
  const postId = req.params.id;
  const userId = req.params.userId;
  const { title, body } = req.body;
  db.query('UPDATE posts SET title = ?, body = ? WHERE id = ? AND userID = ?', [title, body ,postId, userId], (err, results) => {
  if (err) {
    console.error('Error updating post: ', err);
    res.status(500).json({ error: 'Error updating post' });
    return;
  }
  res.json({ message: 'Post updated successfully' });
  });
});

// Delete a post
router.delete('/:id', (req, res) => {
  const postId = req.params.id;
  db.query('DELETE FROM posts WHERE id = ?', [postId], (err, results) => {
    if (err) {
      console.error('Error deleting post: ', err);
      res.status(500).json({ error: 'Error deleting post' });
      return;
    }
    res.json({ message: 'Post deleted successfully' });
  });
});

module.exports = router;


