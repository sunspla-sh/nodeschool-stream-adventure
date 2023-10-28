const combine = require('stream-combiner');
const through2 = require('through2');
const split2 = require('split2');
const { createGzip } = require('zlib');


/**
 * My solution
 */
// module.exports = function () {

//   let buf = {};
  
//   function write(obj, enc, next) {
//     obj = JSON.parse(obj)
//     //on type = genre, create new json object with genre name and empty book array
//     if(obj['type'] === 'genre') {
//       //on type genre again, push old json object and reset buf
//       if(buf['name']){
//         this.push(JSON.stringify(buf))
//         buf = {};
//       }
//       buf['name'] = obj['name']
//       buf['books'] = [];
//       next()
//       return  
//     }

//     // on type = book, push book name to book array
//     if(obj['type'] === 'book'){
//       buf['books'].push(obj['name']);
//       next()
//       return;
//     }

//     next()
//   }

//   function end(done) {
//     this.push(JSON.stringify(buf))
//     done();
//   }
  
//   return combine(
//     split2(),
//     through2(write, end),
//     createGzip(),
//   );
// }

/**
 * Official solution
 */

// module.exports = function() {
//   const grouper = through2(write, end);
//   let current;

//   function write(line, _, next) {
//     if(line.length === 0) return next()
//     const row = JSON.parse(line)

//     if(row.type === 'genre') {
//       if(current) {
//         this.push(JSON.stringify(current) + '\n')
//       }
//       current = { name: row.name, books: [] }
//     } else if (row.type === 'book') {
//       current.books.push(row.name)
//     }
//     next()
//   }

//   function end(next) {
//     if(current) {
//       this.push(JSON.stringify(current) + '\n')
//     }
//     next()
//   }

//   return combine(split2(), grouper, createGzip())
// }

/**
 * Official Solution Reworked
 */

module.exports = function() {

  let obj;

  const write = (line, enc, next) => {
    
    if(!line.length) return next();

    const row = JSON.parse(line);

    if(row.type === 'genre') {
      if(obj) {
        let tmp = obj;
        obj = { name: row.name, books: [] };
        return next(null, JSON.stringify(tmp) + '\n');
      }
      obj = { name: row.name, books: [] };
      return next();
    }
    if(row.type === 'book') {
      obj.books.push(row.name)
    }
    next()
  };

  const end = (done) => {
    done(null, JSON.stringify(obj) + '\n');
  };

  const grouper = through2(write, end);

  return combine(
    split2(),
    grouper,
    createGzip()
  )
}