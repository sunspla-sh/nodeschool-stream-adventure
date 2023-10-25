const { Writable } = require('stream');

class MyWritableStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log('writing: ' + chunk)
    callback()
  }
}

const myWritableStream = new MyWritableStream();
process.stdin.pipe(myWritableStream);