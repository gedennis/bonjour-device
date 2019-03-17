const fs = require('fs');
const Koa = require('koa');
const mdns = require('mdns');
const http = require('http');
const path = require('path');
const socket = require('socket.io');

const config = require('./config');

const app = new Koa();

const NAME = process.env.DEVNAME || config.name;
const PORT = process.env.PORT || config.port;
// app.use(ctx => {
//   ctx.body = `Hello, this is device ${NAME}`;
// });
app.use(ctx => {
  ctx.type = 'text/html';
  ctx.body = fs.createReadStream(path.join(__dirname, 'index.html'));
});

const server = http.createServer(app.callback());
const io = socket(server);
io.on('connection', socket => {
  console.log('A device connected');
  socket.on('message', message => {
    console.log('Receive message from device', message);
  });
  socket.on('disconnect', function(msg) {
    console.log('device disconnected');
    console.log('disconnect', msg);
  });
});
server.listen(PORT);
server.on('listening', () => {
  const type = 'http';

  // publish an advertisement
  const opt = { name: NAME };
  const ad = mdns.createAdvertisement(
    mdns.tcp('http'),
    server.address().port,
    opt
  );
  ad.start();

  console.info('Server is listening on port:%d', server.address().port);
});
