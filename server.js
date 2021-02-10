const http = require('http');
const https = require('https');
const { parse } = require('url');
const next = require('next');
const path = require('path');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port1 = 80;
const port2 = 443;

let options;
if (!dev) {
  options = {
    ca: fs.readFileSync('/etc/letsencrypt/live/shamp.kr/fullchain.pem'),
    key: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/shamp.kr/privkey.pem'), 'utf8').toString(),
    cert: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/shamp.kr/cert.pem'), 'utf8').toString(),
  };
}

app.prepare().then(() => {
  http.createServer(options, (req, res) => {
    if (!dev) {
      res.statusCode = 302;
      res.setHeader('Location', `https://shamp.kr${req.url}`);
      res.end();
    } else {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }
  }).listen(port1, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port1}`);
  });

  if (!dev) {
    https.createServer(options, (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(port2, (err) => {
      if (err) throw err;
      console.log(`> Ready on https://localhost:${port2}`);
    });
  }
});
