const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

   socket.on('enter msg', (name) => {
      socket.userName = name;
      socket.broadcast.emit('enter msg', name);
   });

   socket.on('disconnect', () => {
      socket.broadcast.emit('exit msg', socket.userName);
   });

   socket.on('chat message', (data) => {
      io.emit('chat message', data.name, data.msg);
   });
});

http.listen(3000, () => {
   console.log('listening on *:3000');
});