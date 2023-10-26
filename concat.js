const concat = require('concat-stream');

// my icky solution
// const { Readable } = require('stream');

// class MyReadableStream extends Readable {
//   _read() {}
// }

// process.stdin
//   .pipe(concat(buf => {
//     const myReadableStream = new MyReadableStream();
//     myReadableStream.push(buf.reverse().toString())
//     myReadableStream.pipe(process.stdout);
//   }))
  
// the "correct" solution
process.stdin.pipe(concat(function(buf){
  const s = buf.toString().split('').reverse().join('');
  process.stdout.write(s);
}))