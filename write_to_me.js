const { Writable } = require('stream');

const myWritableStream = new Writable({});
myWritableStream._write = (chunk, encoding, callback) => {
  console.log('writing: ' + chunk);
  callback()
};

process.stdin.pipe(myWritableStream)

