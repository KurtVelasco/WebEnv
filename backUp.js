const express = require('express');
const path = require('path');
const app = express();
const port = 3000;


const { setSearchTerm } = require('./pythonJS'); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/'));

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'html/hyper.html');
  res.sendFile(filePath);
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
