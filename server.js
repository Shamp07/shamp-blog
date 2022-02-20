const http = require('http');
const https = require('https');

const next = require('next');

const path = require('path');
const fs = require('fs');

const sslConfig = require('./config/ssl.config.json');

const PORT = 80;
const SSL_PORT = 443;

const HTTPS_PREFIX = 'https://';

const DEV_HOSTNAME = 'dev.shamp.kr';
const PROD_HOSTNAME = 'shamp.kr';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, port: SSL_PORT, hostname: dev ? DEV_HOSTNAME : PROD_HOSTNAME });
const handle = app.getRequestHandler();

const options = (() => (dev ? {
  ca: fs.readFileSync(path.join(__dirname, sslConfig.local.ca)),
  key: fs.readFileSync(path.join(__dirname, sslConfig.local.key), 'utf8').toString(),
  cert: fs.readFileSync(path.join(__dirname, sslConfig.local.cert), 'utf8').toString(),
  passphrase: sslConfig.local.passphrase,
} : {
  ca: fs.readFileSync(sslConfig.remote.ca),
  key: fs.readFileSync(path.resolve(process.cwd(), sslConfig.remote.key), 'utf8').toString(),
  cert: fs.readFileSync(path.resolve(process.cwd(), sslConfig.remote.cert), 'utf8').toString(),
}))();

app.prepare().then(() => {
  if (!dev) {
    http.createServer((req, res) => {
      res.writeHead(301, {
        Location: `${HTTPS_PREFIX}${req.headers.host}${req.url}`,
      });
      res.end();
    }).listen(PORT, (err) => {
      if (err) throw err;
    });
  }

  https.createServer(options, (req, res) => {
    handle(req, res);
  }).listen(SSL_PORT, (err) => {
    if (err) throw err;
  });
});
