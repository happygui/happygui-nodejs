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

app.get("/final", function(req, res) {
  res.render("preview.html");
});


io.sockets.on('connection', function (socket) {
  socket.on('putCollection', function (i, data) {
    console.log(i, data);
    socket.broadcast.emit('gotCollection', data);
  });
  socket.on('updateElement', function (i, data) {
    console.log(i, data);
    socket.broadcast.emit('updatedElement', i, data);
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




