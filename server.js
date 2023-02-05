const express = require('express');
const child_process = require('child_process');
const exec = require('child_process').exec;
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

app.get('/api/commands', (req, res) => {
  fs.readFile('./config.json', 'utf8', (error, data) => {
    if (error) {
      return res.status(500).json({ error });
    }

    const config = JSON.parse(data);
    res.status(200).json(config);
  });
});

app.get('/api/commands/:id/run', (req, res) => {
  // Read the config file
  fs.readFile('./config.json', (err, data) => {
    if (err) return res.status(500).send(err.message);
    
    // Parse the JSON data
    let config;
    try {
      config = JSON.parse(data);
      const id = req.params.id;
      const record = config.find(r => r.id === id);
      if (!record) {
        res.status(404).send({ error: 'Record not found' });
      } else {
        // Get the commands from the config
        const command = record.command;

        runCommand(command, (err, cmdOutput) => {
          if (err) return res.status(500).send(err.message);
          res.send({output: `${cmdOutput}`});
        });
      }
    } catch (err) {
      return res.status(500).send(err.message);
    }

  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

