const { createDecipheriv, createHash } = require("crypto");
const { Parse } = require("tar");
const concat = require("concat-stream");


/**
 * My solution
 */
// const algo = process.argv[2];
// const key = process.argv[3];
// const iv = process.argv[4];

// const decipherStream = createDecipheriv(algo, key, iv);

// const tarParserStream = new Parse({ filter: (p, e) => e.type === "File" });
// tarParserStream.on("entry", (e) => {
//   e.pipe(
//     concat(function (buf) {
//       process.stdout.write(createHash("md5", { encoding: "hex" }).update(buf).digest().toString('hex') + ' ' + e.path + '\n')
//     })
//   );
// });

// process.stdin.pipe(decipherStream).pipe(tarParserStream);


/**
 * Official Solution
 */

const cipher = process.argv[2];
const key = process.argv[3];
const iv = process.argv[4];

const parser = new Parse();

parser.on('entry', e => {
  
  if(e.type !== 'File') return e.resume();

  const h = createHash('md5', { encoding: 'hex' });

  e.pipe(h).pipe(concat(function(buf){
    console.log(buf + ' ' + e.path)
  }));

});

process.stdin.pipe(createDecipheriv(cipher, key, iv)).pipe(parser);
