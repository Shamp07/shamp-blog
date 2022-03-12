const https = require('https');

const next = require('next');

const path = require('path');
const fs = require('fs');

const sslConfig = require('./config/ssl.config.json');

const SSL_PORT = 443;

const app = next({ dev: true });
const handle = app.getRequestHandler();

const options = {
  ca: fs.readFileSync(path.join(__dirname, sslConfig.local.ca)),
  key: fs.readFileSync(path.join(__dirname, sslConfig.local.key), 'utf8').toString(),
  cert: fs.readFileSync(path.join(__dirname, sslConfig.local.cert), 'utf8').toString(),
  passphrase: sslConfig.local.passphrase,
};

app.prepare().then(() => {
  https.createServer(options, (req, res) => {
    handle(req, res);
  }).listen(SSL_PORT, (err) => {
    if (err) throw err;
  });
});
