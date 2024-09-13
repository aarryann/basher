const express = require('express');
const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');
const helmet = require('helmet');

const app = express();
const port = process.env.PORT || 3111;
const staticPath = path.join(__dirname, 'public');
const configPath = path.join(__dirname, 'config.json');

app.use(express.json());

// Middleware to generate and set nonce
app.use((req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString('base64');
  next();
});

// app.use(helmet.contentSecurityPolicy({
//   directives: {
//     defaultSrc: ["'self'"],
//     scriptSrc: [
//       "'self'",
//       (req, res) => `'nonce-${res.locals.nonce}'`
//     ],
//     styleSrc: [
//       "'self'",
//       (req, res) => `'nonce-${res.locals.nonce}'`,
//       "https://cdnjs.cloudflare.com"
//     ],
//     fontSrc: ["https://cdnjs.cloudflare.com"],
//     imgSrc: ["'self'", "data:", "https:"],
//   }
// }));

app.use(express.static(staticPath));

// Helper function to replace nonce in HTML content
const replaceNonce = (content, nonce) => {
  return content.replace(/nonce="a23gbfz9e"/g, `nonce="${nonce}"`).replace(/nonce-a23gbfz9e/g, `nonce-${nonce}`);
};

app.get('/', (req, res) => {
  res.sendFile(path.join(staticPath, 'pages', 'index.html'));
});

// Update the route to send the index.html file
app.get('/', (req, res) => {
  fs.readFile(path.join(staticPath, 'pages', 'index.html'), 'utf8')
    .then(content => {
      // Replace the hardcoded nonce with the dynamically generated one
      const updatedContent = replaceNonce(content, res.locals.nonce);
      res.send(updatedContent);
    })
    .catch(err => {
      console.error('Error reading index.html:', err);
      res.status(500).send('Internal Server Error');
    });
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

app.get('/api/commands/:id/run/1', async (req, res) => {
  try {
    const config = await getConfig();
    const record = config.find(r => r.id === req.params.id);

    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }

    const output = await runCommand(record.command_1);
    res.json({ output });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/commands/:id/feedback', async (req, res) => {
  try {
    const config = await getConfig();
    const record = config.find(r => r.id === req.params.id);
    console.log(record.feedback);

    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }

    const output = await runCommand(record.feedback);
    res.json({ output });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Catch-all route for other paths
app.get('*', (req, res) => {
  const requestedPath = req.path.slice(1); // Remove leading slash

  // Determine the appropriate path based on whether the request has a file extension
  const pagePath = path.extname(requestedPath) !== ''
    ? path.join(staticPath, requestedPath)
    : path.join(staticPath, 'pages', `${requestedPath}.html`);

  fs.readFile(pagePath, 'utf8')
    .then(content => {
      // Only replace nonce if it's an HTML file
      if (path.extname(pagePath) === '.html') {
        content = replaceNonce(content, res.locals.nonce);
      }
      res.send(content);
    })
    .catch(err => {
      if (err.code === 'ENOENT') {
        // File not found, send 404 page
        fs.readFile(path.join(staticPath, '404.html'), 'utf8')
          .then(content => {
            const updatedContent = replaceNonce(content, res.locals.nonce);
            res.status(404).send(updatedContent);
          })
          .catch(error => {
            console.error('Error reading 404.html:', error);
            res.status(404).send('Not Found');
          });
      } else {
        console.error(`Error reading file ${pagePath}:`, err);
        res.status(500).send('Internal Server Error');
      }
    });

});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
