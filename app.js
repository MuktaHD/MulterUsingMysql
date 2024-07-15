const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = 3000;

// Set up storage engine
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Upload route
app.post('/upload', upload.single('File'), (req, res) =>  {
  console.log(req.file);
    const { filename, path: filePath, originalname, mimetype, size } = req.file;
  const sql = 'INSERT INTO files (filename, path, originalname, mimetype, size) VALUES (?, ?, ?, ?, ?)';

  db.query(sql, [filename, filePath, originalname, mimetype, size], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send(`File uploaded: ${filename}`);
  });
});

//Multiple Files

app.post('/uploads', upload.array('Files', 12), (req, res) => {
  const files = req.files;
  
  if (!files || files.length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const sql = 'INSERT INTO files (filename, path, originalname, mimetype, size) VALUES ?';
  const values = files.map(file => [file.filename, file.path, file.originalname, file.mimetype, file.size]);

  db.query(sql, [values], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send(`Files uploaded: ${files.map(file => file.filename).join(', ')}`);
  });
});

// Serve the file
app.get('/download/:filename', (req, res) => {
  const sql = 'SELECT * FROM files WHERE filename = ?';

  db.query(sql, [req.params.filename], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length === 0) {
      return res.status(404).send('File not found');
    }
    const file = result[0];
    res.download(file.path, file.originalname);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
