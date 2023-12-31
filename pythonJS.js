const { spawn } = require('child_process');

let searchTerm = '';

function setSearchTerm(term) {
  searchTerm = term;
  getSearchTerm();
}

function getSearchTerm() {
  console.log('Youtube link: ' + searchTerm);
  callPython();
  //return searchTerm;
}

function callPython() {
  const childPython = spawn('python', ['youtube2Mp3.py', searchTerm]);

  childPython.stdout.on('data', (data) => {
    console.log(`${data}`);
  });

  childPython.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  childPython.on('exit', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}
module.exports = { setSearchTerm, getSearchTerm };