const http = require('http');
const https = require('https');

const express = require('express');
const next = require('next');

const path = require('path');
const fs = require('fs');

const sslConfig = require('./config/ssl.config.json');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = 80;
const SSL_PORT = 443;

let options;
if (dev) {
  options = {
    ca: fs.readFileSync(path.join(__dirname, sslConfig.local.ca)),
    key: fs.readFileSync(path.join(__dirname, sslConfig.local.key), 'utf8').toString(),
    cert: fs.readFileSync(path.join(__dirname, sslConfig.local.cert), 'utf8').toString(),
    passphrase: sslConfig.local.passphrase,
  };
} else {
  options = {
    ca: fs.readFileSync(sslConfig.ca),
    key: fs.readFileSync(path.resolve(process.cwd(), sslConfig.remote.key), 'utf8').toString(),
    cert: fs.readFileSync(path.resolve(process.cwd(), sslConfig.remote.cert), 'utf8').toString(),
  };
}

app.prepare().then(() => {
  const server = express();

  server.all('*', (req, res) => handle(req, res));

  http.createServer(server).listen(PORT, (err) => {
    if (err) throw err;
  });

  https.createServer(options, server).listen(SSL_PORT, (err) => {
    if (err) throw err;
  });
});
