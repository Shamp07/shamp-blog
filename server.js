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

const PORT = 80;
const SSL_PORT = 443;

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
  }).listen(PORT, (err) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`> Ready on http://localhost:${PORT}`);
  });

  const ioServer = io(server);
  const users = {};
  ioServer.on('connection', (socket) => {
    socket.on('disconnect', (userId) => {
      delete users[userId];
    });

    socket.on('connect_client', (userId) => {
      users[userId] = socket.id;
    });

    socket.on('send_message', ({ message, toUserId, fromUserId }) => {
      if (users[toUserId]) {
        ioServer.to(users[toUserId]).emit('receive_message', { message, fromUserId });
      }
    });

    socket.on('get_socket_id', () => {
      ioServer.to(socket.id).emit('send_socket_id', socket.id);
    });
  });

  if (!dev) {
    https.createServer(options, (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(SSL_PORT, (err) => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      console.log(`> Ready on https://localhost:${SSL_PORT}`);
    });
  }
});
