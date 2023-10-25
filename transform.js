const through = require('through2');

function write(buffer, encoding, next) {
  this.push(buffer.toString().toUpperCase());
  next();
}

function end(done) {
  done();
}

const myTransformStream = through(write, end);

process.stdin.pipe(myTransformStream).pipe(process.stdout);