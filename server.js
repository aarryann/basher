const express = require('express');
const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = process.env.PORT || 3111;
const staticPath = path.join(__dirname, 'public');
const configPath = path.join(__dirname, 'config.json');

app.use(express.json());
app.use(express.static(staticPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(staticPath, 'pages', 'index.html'));
});

const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) return reject(err);
      console.log(`stdout: ${stdout}`);
      if (stderr) console.error(`stderr: ${stderr}`);
      resolve(stdout);
    });
  });
};

// const runCommand = (command, callback) => {
//   exec(command, (err, stdout, stderr) => {
//     if (err) return callback(err);
//     console.log(`stdout: ${stdout}`);
//     if (stderr)
//       console.error(`stderr: ${errMessage}`);

//     return callback(null, stdout);
//   });
// };

const getConfig = async () => {
  try {
    const data = await fs.readFile(configPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading config:', error);
    throw error;
  }
};

app.get('/api/commands', async (req, res) => {
  try {
    const config = await getConfig();
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// app.get('/api/commands', (req, res) => {
//   fs.readFile(__dirname + '/config.json', 'utf8', (error, data) => {
//     if (error) {
//       console.log(error);
//       return res.status(500).json({ error });
//     }

//     const config = JSON.parse(data);
//     res.status(200).json(config);
//   });
// });

app.get('/api/commands/:id/run', async (req, res) => {
  try {
    const config = await getConfig();
    const record = config.find(r => r.id === req.params.id);

    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }

    const output = await runCommand(record.command);
    res.json({ output });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// app.get('/api/commands/:id/run', (req, res) => {
//   // Read the config file
//   fs.readFile(__dirname + '/config.json', (err, data) => {
//     if (err) return res.status(500).send(err.message);

//     // Parse the JSON data
//     let config;
//     try {
//       config = JSON.parse(data);
//       const id = req.params.id;
//       const record = config.find(r => r.id === id);
//       if (!record) {
//         res.status(404).send({ error: 'Record not found' });
//       } else {
//         // Get the commands from the config
//         const command = record.command;

//         runCommand(command, (err, cmdOutput) => {
//           if (err) return res.status(500).send(err.message);
//           res.send({ output: `${cmdOutput}` });
//         });
//       }
//     } catch (err) {
//       return res.status(500).send(err.message);
//     }

//   });
// });

// Catch-all route for other paths
app.get('*', (req, res) => {
  const requestedPath = req.path.slice(1); // Remove leading slash

  // Determine the appropriate path based on whether the request has a file extension
  const pagePath = path.extname(requestedPath) !== ''
    ? path.join(staticPath, requestedPath)
    : path.join(staticPath, 'pages', `${requestedPath}.html`);

  res.sendFile(pagePath, (err) => {
    if (err) {
      res.status(404).sendFile(path.join(staticPath, '404.html'));
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
