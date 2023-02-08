const express = require('express');
const app = express();
const server = require('http').createServer(app);
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });
const { spawn } = require('child_process');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    // Parse the message as a JSON object
    const command = JSON.parse(message);
    
    // Spawn a new child process to execute the command
    const child = spawn(command.cmd, command.args);

    // Send the stdout and stderr data from the child process to the client
    child.stdout.on('data', (data) => {
      ws.send(JSON.stringify({ type: 'stdout', data: data.toString() }));
    });
    child.stderr.on('data', (data) => {
      ws.send(JSON.stringify({ type: 'stderr', data: data.toString() }));
    });

    // Send any user input to the child process's stdin
    ws.on('message', (input) => {
      child.stdin.write(input);
    });

    // Notify the client when the command has completed
    child.on('close', (code) => {
      ws.send(JSON.stringify({ type: 'exit', code }));
    });
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
