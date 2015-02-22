var fs = require('fs');
var net = require('net');
var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var unixServer = net.createServer(function(client) {
    console.log('Client connected');
    client.on('data', function(data){
      data = data.toString();
      console.log(data);
      io.emit(data);
    })
});

var socket_addr = 'alert.sock'
if (fs.existsSync(socket_addr)) {
  fs.unlinkSync(socket_addr);
}

unixServer.listen(socket_addr);

io.on('connection', function(socket){
  console.log('Connected');
})

// Serve public on /
app.use('/', express.static('public'));

// Listen
server.listen(80, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('App listening at http://%s:%s', host, port)

})
