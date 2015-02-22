var express = require('express')
var app = express()

// Serve public on /
app.use('/', express.static('public'));

// Listen
var server = app.listen(80, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('App listening at http://%s:%s', host, port)

})
