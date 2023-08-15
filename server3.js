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
  const filePath = path.join(__dirname, 'html/main.html');
  res.sendFile(filePath);
});

app.get('/download', (req, res) => {
  const folderPath = './downloadYoutube'; // Replace with the actual folder path

  // Get the list of files in the folder
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      // Handle the error if the folder cannot be read
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    if (files.length === 0) {
      // Handle the case when the folder is empty
      return res.status(404).send('No files found');
    }

    // Assuming that there is only one file in the folder
    const fileName = files[0];
    const filePath = path.join(folderPath, fileName);

    // Set the response headers


    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'audio/mpeg');

    // Read the file from the local filesystem
    const fileStream = fs.createReadStream(filePath);
    // Pipe the file stream to the response
    fileStream.pipe(res);
});
});

app.post('/search', (req, res) => { 
  const searchTerm = req.body.searchTerm;
  console.log('Search term:', searchTerm);
  setSearchTerm(searchTerm);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});