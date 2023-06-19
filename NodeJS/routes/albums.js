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

// Get all albums of userId
router.get('/:userId', (req,res) => {
    const userId = req.params.userId;
  db.query('SELECT * FROM albums WHERE userId = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error getting albums: ', err);
      res.status(500).json({ error: 'Error getting albums' });
      return;
    }
    res.json(results);
  });
});

// Get a specific album of id
router.get('/:userId/:albumId', (req, res) => {
  const userId = req.params.userId;
  const albumId = req.params.albumId;
  db.query('SELECT * FROM albums WHERE id = ? AND userId = ?', [albumId ,userId], (err, results) => {
    if (err) {
      console.error('Error retrieving album: ', err);
      res.status(500).json({ error: 'Error retrieving album' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Album not found' });
      return;
    }
    const album = results[0];
    res.json({ album });
  });
});


// Create a new album for userId
router.post('/:userId', (req, res) => {
  const userId = req.params.userId;
  const { title } = req.body;
  db.query('INSERT INTO albums (userId, title) VALUES (?, ?)', [userId ,title], (err, results) => {
    if (err) {
      console.error('Error creating album: ', err);
      res.status(500).json({ error: 'Error creating album' });
      return;
    }
    res.json({ message: 'Album created successfully' });
  });
});


// Update a album
router.put('/:userId/:albumId', (req, res) => {
    const userId = req.params.userId;
    const albumId = req.params.albumId;
  const { title } = req.body;
  db.query('UPDATE albums SET title = ? WHERE id = ? AND userId = ?', [title, albumId, userId], (err, results) => {
  if (err) {
    console.error('Error updating album: ', err);
    res.status(500).json({ error: 'Error updating album' });
    return;
  }
  res.json({ message: 'Album updated successfully' });
  });
});

// Delete a album
router.delete('/:userId/:albumId', (req, res) => {
    const userId = req.params.userId;
    const albumId = req.params.albumId;
  db.query('DELETE FROM albums WHERE id = ? AND userId = ?', [albumId,userId], (err, results) => {
    if (err) {
      console.error('Error deleting album: ', err);
      res.status(500).json({ error: 'Error deleting album' });
      return;
    }
    res.json({ message: 'Album deleted successfully' });
  });
});

module.exports = router;


