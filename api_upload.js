const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/profile');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Save with unique name
  },
});

const upload = multer({ storage: storage });

// POST route for file upload
router.post('/upload', upload.single('profilePicture'), (req, res) => {
  try {
    res.status(200).json({ message: 'File uploaded successfully', filePath: `${req.file.filename}` });
  } catch (error) {
    res.status(500).json({ message: 'File upload failed', error: error.message });
  }
});

module.exports = router;
