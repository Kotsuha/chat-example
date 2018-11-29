var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.use(express.static('public'));

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);

  // 我一直忘記網址是多少所以這邊顯示一下 (borrowed from http-server)
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
