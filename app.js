var port = process.env.PORT || 1234
  , express = require('express')
  , async = require('async')
  , ejs = require("ejs")
  , http = require('http');

var app = express()
  , server = app.listen(port)
  , io = require('socket.io').listen(server);

app.configure(function () {
  app.set("views", __dirname + "/static");
  app.set("view engine", "ejs");
  app.engine("html", ejs.renderFile);
  app.use(express.bodyParser());
  app.use(express.cookieParser("alskjald0q9udqokwdmqldiqud0woqijdklq09"));
  app.use(express.session());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + "/static"));
  app.use(app.router);
});

app.get("/", function(req, res) {
  res.render("editor.html");
});

app.get("/preview", function(req, res) {
  res.render("preview.html");
});

io.configure(function () { 
  io.set('transports', [
    'xhr-polling'
  , 'jsonp-polling'
  , 'htmlfile'
  ]);
  io.set("polling duration", 10); 
});

io.sockets.on('connection', function (socket) {
  socket.emit("connected", 1);
  socket.on('putCollection', function (data) {
    console.log(data);
    socket.broadcast.emit('gotCollection', data);
  });
  socket.on('updateElement', function (element, key, data) {
    console.log(element, key, data);
    socket.broadcast.emit('updatedElement', element, key, data);
  });
  socket.on('updatePosElement', function (element, x, y) {
    console.log(element, x, y);
    socket.broadcast.emit('updatedPosElement', element, x,y);
  });
  socket.on('createElement', function (data) {
    console.log(data);
    socket.broadcast.emit('createdElement', data);
  });
  socket.on('deleteElement', function (data) {
    console.log(data);
    socket.broadcast.emit('deletedElement', data);
  });
});




