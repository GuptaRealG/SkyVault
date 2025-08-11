const express = require('express');
const router = express.Router();
const upload = require('../config/cloudinary.config'); // multer config

// GET route
router.get('/home', (req, res) => {
  res.render('home', {
    cloudinaryUrl: null,
    originalName: null,
  });
});

// POST route
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'File not received' });
  }

  console.log("Uploaded file =>", JSON.stringify(req.file, null, 2));

  // After successful upload, render home with uploaded file info
  res.render('home', {
    cloudinaryUrl: req.file.path,
    originalName: req.file.originalname,
  });
});

module.exports = router;

