var port = process.env.PORT || 1234
  , express = require('express')
  , async = require('async')
  , http = require('http');

var app = express()
  , server = app.listen(port)
  , io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  socket.on('my other event', function (data) {
    console.log(data);
  });
});