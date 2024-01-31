const express = require('express');
const child_process = require('child_process');
const exec = require('child_process').exec;
const app = express();
const port = process.env.PORT || 3111;
const fs = require('fs');
const path = require('path');

const staticPath = path.join(__dirname, 'public');
app.use(express.json());
app.use(express.static(staticPath));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/pages/index.html');
});

const runCommand = (command, callback) => {
  exec(command, (err, stdout, stderr) => {
    if (err) return callback(err);
    console.log(`stdout: ${stdout}`);
    if (stderr)
      console.error(`stderr: ${errMessage}`);

    return callback(null, stdout);
  });
};

app.get('/api/commands', (req, res) => {
  fs.readFile(__dirname + '/config.json', 'utf8', (error, data) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error });
    }

    const config = JSON.parse(data);
    res.status(200).json(config);
  });
});

app.get('/api/commands/:id/run', (req, res) => {
  // Read the config file
  fs.readFile(__dirname + '/config.json', (err, data) => {
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
          res.send({ output: `${cmdOutput}` });
        });
      }
    } catch (err) {
      return res.status(500).send(err.message);
    }

  });
});

// Use a single route to handle all user-friendly URLs, including nested paths
app.get('/:path*', (req, res) => {
  const requestedPath = req.params.path.toLowerCase();
  const nestedPath = req.params[0] || ''; // Capturing the nested path with *
  const fullNestedPath = path.join(requestedPath, req.params[0]) || requestedPath; // Capturing the nested path with *

  const pagePath = path.join(staticPath, 'pages/', `${fullNestedPath}.html`);
  if (fs.existsSync(pagePath)) {
    // If the requested file exists within 'pages', serve HTML files from the 'pages' folder
    res.sendFile(pagePath, (err) => {
      if (err) {
        // If the file doesn't exist, serve a custom 404 page
        res.status(404).sendFile(path.join(staticPath, '404.html'));
      }
    });
  } else {
    // For any other path:
    // - If it has no extension, consider it a JS file
    // - If it has an extension, serve files directly
    const filePath = path.extname(req.path) === '' ? path.join(staticPath, req.path + '.js') : path.join(staticPath, req.path);
    res.sendFile(filePath, (err) => {
      if (err) {
        // If the file doesn't exist, serve a custom 404 page
        res.status(404).sendFile(path.join(staticPath, '404.html'));
      }
    });
  }
});

//app.use(appRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
