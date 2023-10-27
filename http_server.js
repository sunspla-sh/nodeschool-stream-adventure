const http = require('http');
const through = require('through2');

function write(buf, enc, next) {
  this.push(buf.toString().toUpperCase());
  next();
}

function end(done) {
  done();
}

const tr = through(write, end);

const server = http.createServer(function(req, res) {
  if(req.method === 'POST'){
    req.pipe(tr).pipe(res);
  } else {
    res.end('send me a POST request :)');
  }
});

server.listen(process.argv[2]);