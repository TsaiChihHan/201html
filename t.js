var http = require('http')
var url = require('url')
var express = require('express')
var app - express();

var server = httpcreateServer(app);
app.get('/getcity', function (req, res))

var server = http.createServer(function (req, res) {
  console.log(reg.url);
  var parsedUrl = url.parse(req.url, true);
  console.log(parsedUrl);
  if(/^\/api\/parsetime/.test(req.url)) {
    console.log("Got Parsetime");
  }
  res.writeHead(200, {'Content-Type':'application/json'});
  var result = [{city:'Provo'},{city:'Price'}];
  res.end(JSON.stringify(result));
});
server.listen(3000);
