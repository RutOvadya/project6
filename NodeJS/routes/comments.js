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

// Get all commnts of postId
router.get('/:postId', (req,res) => {
    const postId = req.params.postId;
  db.query('SELECT * FROM comments WHERE postId = ?', [postId], (err, results) => {
    if (err) {
      console.error('Error getting comments: ', err);
      res.status(500).json({ error: 'Error getting comments' });
      return;
    }
    res.json(results);
  });
});

// Get a specific commnt of postId
router.get('/:postId/:commentId', (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  db.query('SELECT * FROM comments WHERE id = ? AND postId = ?', [commentId ,postId], (err, results) => {
    if (err) {
      console.error('Error retrieving comment: ', err);
      res.status(500).json({ error: 'Error retrieving comment' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Comment not found' });
      return;
    }
    const comment = results[0];
    res.json({ comment });
  });
});


// Create a new comment for postId
router.post('/:postId', (req, res) => {
  const postId = req.params.postId;
  const { name, email, body } = req.body;
  db.query('INSERT INTO comments (postId ,name, email, body) VALUES (?, ?, ?, ?)', [postId ,name, email, body], (err, results) => {
    if (err) {
      console.error('Error creating comment: ', err);
      res.status(500).json({ error: 'Error creating comment' });
      return;
    }
    res.json({ message: 'Comment created successfully' });
  });
});


// Update a comment
router.put('/:postId/:commentId', (req, res) => {
    const postId = req.params.postId;
  const commentId = req.params.commentId;
  const { name, email, body } = req.body;
  db.query('UPDATE comments SET name = ?, email = ?, body = ? WHERE id = ? AND postId = ?', [name, email, body, commentId, postId], (err, results) => {
  if (err) {
    console.error('Error updating comment: ', err);
    res.status(500).json({ error: 'Error updating comment' });
    return;
  }
  res.json({ message: 'Comment updated successfully' });
  });
});

// Delete a comment
router.delete('/:postId/:commentId', (req, res) => {
    const postId = req.params.postId;
  const commentId = req.params.commentId;
  db.query('DELETE FROM comments WHERE id = ? AND postId = ?', [commentId,postId], (err, results) => {
    if (err) {
      console.error('Error deleting comment: ', err);
      res.status(500).json({ error: 'Error deleting comment' });
      return;
    }
    res.json({ message: 'Comment deleted successfully' });
  });
});

module.exports = router;


