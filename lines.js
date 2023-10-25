const through = require('through2');

let count = 0;

function write(buffer, encoding, next) {

  if(count % 2 === 1) {
    this.push(buffer.toString().toUpperCase());
    count++;
    next()
    return;
  }
  this.push(buffer.toString().toLowerCase());
  next();
  count++;
}

function end(done) {
  done()
}

process.stdin.pipe(through(write, end)).pipe(process.stdout);

