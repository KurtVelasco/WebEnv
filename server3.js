const express = require('express');
const path = require('path');
const fs = require('fs');
const { setSearchTerm } = require('./pythonJS');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/'));

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'html/hyper.html');
  res.sendFile(filePath);
});

app.get('/download', (req, res) => {
  const filePath = './example.txt'; // Replace with the actual file path
  const fileName = 'example.txt'; // Replace with the desired file name

  // Set the response headers
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
  res.setHeader('Content-Type', 'text/plain');

  // Read the file from the local filesystem
  const fileStream = fs.createReadStream(filePath);

  // Pipe the file stream to the response
  fileStream.pipe(res);
});

app.post('/search', (req, res) => {
  const searchTerm = req.body.searchTerm;
  console.log('Search term:', searchTerm);
  setSearchTerm(searchTerm);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});