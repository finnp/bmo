#!/usr/bin/env node

var http = require('http');
var fs = require('fs');
var send = require('send');

var port = 2600;
var root = process.cwd();

var errorHandler = function(err) {
  res.statusCode = err.status || 500;
  var errorPath = root + '/' + res.statusCode + '.html';
  fs.createReadStream(errorPath)
    .on('error', function() { res.end('Error ' + res.statusCode); })
    .pipe(res)
    ;
};

var requestHandler = function(req, res){
  send(req, req.url)
    .from(root)
    .on('error', error)
    .pipe(res)
    ;
}

http.createServer(requestHandler).listen(port);

console.log('Let\'s play video games!');
console.log('>> Serving on port ' + port);