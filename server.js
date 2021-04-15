const http = require('http');
const https = require('https');
const { parse } = require('url');
const next = require('next');
const path = require('path');
const fs = require('fs');
const io = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = 80;
const sslPort = 443;

let options;
if (!dev) {
  options = {
    ca: fs.readFileSync('/etc/letsencrypt/live/shamp.kr/fullchain.pem'),
    key: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/shamp.kr/privkey.pem'), 'utf8').toString(),
    cert: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/shamp.kr/cert.pem'), 'utf8').toString(),
  };
}

app.prepare().then(() => {
  const server = http.createServer(options, (req, res) => {
    if (!dev) {
      res.statusCode = 302;
      res.setHeader('Location', `https://shamp.kr${req.url}`);
      res.end();
    } else {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });

  const ioServer = io(server);

  ioServer.on('connection', (socket) => {
    socket.on('disconnect', () => {
      // ioServer.to('all').emit('receiveMessage', message);
    });

    socket.on('send_message', ({ socketId, message }) => {
      ioServer.to(socketId).emit('receive_message', message);
    });

    socket.on('get_socket_id', () => {
      ioServer.to(socket.id).emit('send_socket_id', socket.id);
    });
  });

  if (!dev) {
    https.createServer(options, (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(sslPort, (err) => {
      if (err) throw err;
      console.log(`> Ready on https://localhost:${sslPort}`);
    });
  }
});
