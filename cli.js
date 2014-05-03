#!/usr/bin/env node

var http = require('http');
var fs = require('fs');
var send = require('send');
var program = require('commander');
var open = require('open');
var version = require(__dirname + '/package.json').version;

program
  .version(version)
  .option('-p, --port <n>', 'Port to serve [2600]', parseInt)
  .option('-r, --root [value]', 'Root directory to serve [cwd]')
  .option('-o, --open', 'Open browser with the local server')
  .parse(process.argv)
  ;

var port = program.port || 2600;
var root = program.root || process.cwd();

var startServer = function(root, port) {
  var errorHandler = function(res, err) {
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
    .on('error', errorHandler.bind(this, res))
    .pipe(res)
    ;
  };

  var serverError = function(err) {
    console.log('Battery low. Shutdown. (Error: %s)', err.code);
  };

  console.log('Let\'s play video games!');
  console.log('>> Serving on port ' + port);
  http.createServer(requestHandler)
    .listen(port)
    .on('error', serverError)
    ; 
};

startServer(root, port);

if(program.open) {
  console.log('Opening browser..');
  open('http://localhost:' + port);  
}