const { Readable } = require('stream');
const file = process.argv[2];

const myStream = new Readable({});
myStream._read = () => {};

myStream.push(file);

myStream.pipe(process.stdout);