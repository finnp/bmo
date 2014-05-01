#!/usr/bin/env node

var http = require('http');
var send = require('send');

var port = 2600;

var app = http.createServer(function(req, res){
  send(req, req.url)
    .from(process.cwd())
    .pipe(res);
}).listen(port);

console.log('Let\'s play video games!');
console.log('>> Serving on port ' + port);