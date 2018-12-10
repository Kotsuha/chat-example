var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.use(express.static('public'));

var chatMessageHistory = [];

io.on('connection', function(socket) {
  chatMessageHistory.forEach(function(msg) {
    socket.emit('chat message', msg);
  });

  socket.on('chat message', function(msg) {
    chatMessageHistory.push(msg);
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);

  // Useful tip with local addresses (borrowed from http-server)
  var os = require('os');
  var ifaces = os.networkInterfaces();
  Object.keys(ifaces).forEach(function(dev) {
    ifaces[dev].forEach(function(details) {
      if (details.family === 'IPv4') {
        console.log(('  ' + details.address + ':' + port));
      }
    });
  });
});
