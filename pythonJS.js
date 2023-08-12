const { spawn } = require('child_process');

const childPython = spawn('python', ['hello.py']);

const inputString = 'SUPAH';

childPython.stdin.write(inputString);
childPython.stdin.end();

childPython.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

childPython.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

childPython.on('exit', (code) => {
    console.log(`child process exited with code ${code}`);
});

