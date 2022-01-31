const http = require('http');
const https = require('https');
const { parse } = require('url');
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
if (!dev) {
  options = {
    ca: fs.readFileSync(sslConfig.ca),
    key: fs.readFileSync(path.resolve(process.cwd(), sslConfig.key), 'utf8').toString(),
    cert: fs.readFileSync(path.resolve(process.cwd(), sslConfig.cert), 'utf8').toString(),
  };
}

app.prepare().then(() => {
  http.createServer(options, (req, res) => {
    handle(req, res, parse(req.url, true));
  }).listen(PORT, (err) => {
    if (err) throw err;
  });

  if (!dev) {
    https.createServer(options, (req, res) => {
      handle(req, res, parse(req.url, true));
    }).listen(SSL_PORT, (err) => {
      if (err) throw err;
    });
  }
});
