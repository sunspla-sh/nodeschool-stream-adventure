const { createDecipheriv } = require('crypto');

const key = process.argv[2];
const iv = process.argv[3];

const decipherStream = createDecipheriv('aes256', key, iv);

process.stdin.pipe(decipherStream).pipe(process.stdout);