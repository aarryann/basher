const express = require('express');
const child_process = require('child_process');
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

const runCommand = (command, callback) => {
  exec(command, (err, stdout, stderr) => {
    if (err) return callback(err);
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    return callback(null, stdout);
  });
};

app.get('/commands', (req, res) => {
  fs.readFile('./config.json', 'utf8', (error, data) => {
    if (error) {
      return res.status(500).json({ error });
    }

    const config = JSON.parse(data);
    res.status(200).json(config);
  });
});

app.get('/run-commands', (req, res) => {
  // Read the config file
  fs.readFile('./config.json', (err, data) => {
    if (err) return res.status(500).send(err.message);
    
    // Parse the JSON data
    let config;
    try {
      config = JSON.parse(data);
    } catch (err) {
      return res.status(500).send(err.message);
    }

    // Get the commands from the config
    const commands = config.commands;
    if (!commands || !commands.length) return res.status(500).send('No commands found in config');

    let output = '';
    let index = 0;
    const next = () => {
      if (index >= commands.length) return res.send(`Output: ${output}`);
      
      const command = commands[index];
      runCommand(command, (err, cmdOutput) => {
        if (err) return res.status(500).send(err.message);
        output += cmdOutput;
        index++;
        next();
      });
    };
    next();
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

