const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const { Console } = require('console');

const app = express();
const port = 3000;
console.log("start");
app.use(express.static('Views'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Views','html','hyper.html'));
});

app.post('/process-input', (req, res) => {
  const inputString = req.body.inputString;
 
  const childPython = spawn('python', ['hello.py']);

  childPython.stdin.write(inputString);
  console.log(inputString);
  childPython.stdin.end();

  let output = '';

  childPython.stdout.on('data', (data) => {
    output += data;
    console.log(`stdout: ${data}`)
  });

  childPython.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  childPython.on('exit', (code) => {
    console.log(`child process exited with code ${code}`);
    res.send(output);
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});