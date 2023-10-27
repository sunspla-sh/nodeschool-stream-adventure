/**
 * my nasty solution
 */

// const trumpet = require('trumpet');
// const through2 = require('through2');
// const trmpt = trumpet();


// function write(buf, enc, next) {
//   this.push(buf.toString().toUpperCase())
//   next();
// }

// function end(done) {
//   done();
// }

// process.stdin.pipe(trmpt);
// const innerHtmlStream = trmpt.select('.loud').createStream();
// innerHtmlStream.pipe(through2(write, end)).pipe(innerHtmlStream)
// trmpt.pipe(process.stdout);

/**
 * the official solution
 */

const trumpet = require('trumpet');
const through2 = require('through2');
const tr = trumpet();

function write(buf, enc, next) {
  this.push(buf.toString().toUpperCase());
  next();
}

function end(done) {
  done();
}

const loud = tr.select('.loud').createStream();
loud.pipe(through2(write, end)).pipe(loud);

process.stdin.pipe(tr).pipe(process.stdout);