#!/usr/bin/env node

var http = require('http');
var fs = require('fs');
var send = require('send');
var program = require('commander');
var version = require(__dirname + '/package.json').version;

program
  .version(version)
  .option('-p, --port <n>', 'Port to serve [2600]', parseInt)
  .option('-d, --dir [value]', 'Directory to serve [cwd]')
  .parse(process.argv)
  ;

var port = program.port || 2600;
var root = program.dir || process.cwd();

var errorHandler = function(err) {
  var res = this;
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
    .on('error', errorHandler.bind(res))
    .pipe(res)
    ;
}

http.createServer(requestHandler).listen(port);

console.log('Let\'s play video games!');
console.log('>> Serving on port ' + port);