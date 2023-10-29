const { createDecipheriv, createHash } = require("crypto");
const { Parse } = require("tar");
const concat = require("concat-stream");

const algo = process.argv[2];
const key = process.argv[3];
const iv = process.argv[4];

const decipherStream = createDecipheriv(algo, key, iv);

const tarParserStream = new Parse({ filter: (p, e) => e.type === "File" });
tarParserStream.on("entry", (e) => {
  e.pipe(
    concat(function (buf) {
      process.stdout.write(createHash("md5", { encoding: "hex" }).update(buf).digest().toString('hex') + ' ' + e.path + '\n')
    })
  );
});

process.stdin.pipe(decipherStream).pipe(tarParserStream);
