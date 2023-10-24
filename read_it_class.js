const { Readable } = require('stream');
const file = process.argv[2];

class MyCustomReadableStream extends Readable {
  _read() {}
}

const myCustomReadableStream = new MyCustomReadableStream();

myCustomReadableStream.push(file);
myCustomReadableStream.pipe(process.stdout);