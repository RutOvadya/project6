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

// Get all photos of userId
router.get('/:albumId', (req,res) => {
    const albumId = req.params.albumId;
  db.query('SELECT * FROM photos WHERE albumId = ?', [albumId], (err, results) => {
    if (err) {
      console.error('Error getting photos: ', err);
      res.status(500).json({ error: 'Error getting photos' });
      return;
    }
    res.json(results);
  });
});

// Get a specific photo of id
router.get('/:albumId/:photoId', (req, res) => {
  const albumId = req.params.albumId;
  const photoId = req.params.photoId;
  db.query('SELECT * FROM photos WHERE albumId = ? AND id = ?', [albumId ,photoId], (err, results) => {
    if (err) {
      console.error('Error retrieving photo: ', err);
      res.status(500).json({ error: 'Error retrieving photo' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Album not found' });
      return;
    }
    const photo = results[0];
    res.json({ photo });
  });
});


// Create a new photo for albumId
router.post('/:albumId', (req, res) => {
  const albumId = req.params.userId;
  const { title, thumbnailUrl } = req.body;
  db.query('INSERT INTO photos ( albumId, title, thumbnailUrl) VALUES (?, ?, ?)', [albumId ,title, thumbnailUrl], (err, results) => {
    if (err) {
      console.error('Error creating photo: ', err);
      res.status(500).json({ error: 'Error creating photo' });
      return;
    }
    res.json({ message: 'Photo created successfully' });
  });
});


// Update a photo
router.put('/:albumId/:photoId', (req, res) => {
    const photoId = req.params.photoId;
    const albumId = req.params.albumId;
  const { thumbnailUrl } = req.body;
  db.query('UPDATE photos SET thumbnailUrl = ? WHERE id = ? AND albumId = ?', [thumbnailUrl, photoId, albumId], (err, results) => {
  if (err) {
    console.error('Error updating photo: ', err);
    res.status(500).json({ error: 'Error updating photo' });
    return;
  }
  res.json({ message: 'Photo updated successfully' });
  });
});

// Delete a photo
router.delete('/:albumId/:photoId', (req, res) => {
    const photoId = req.params.photoId;
    const albumId = req.params.albumId;
  db.query('DELETE FROM photos WHERE id = ? AND albumId = ?', [photoId, albumId], (err, results) => {
    if (err) {
      console.error('Error deleting photo: ', err);
      res.status(500).json({ error: 'Error deleting photo' });
      return;
    }
    res.json({ message: 'Photo deleted successfully' });
  });
});

module.exports = router;


