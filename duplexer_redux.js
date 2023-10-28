const duplexer2 = require('duplexer2');
const through2 = require('through2');

module.exports = function (counter) {

  const countryCounts = {};

  function write(obj, enc, next) { 
    countryCounts[obj['country']] = countryCounts[obj['country']] ? countryCounts[obj['country']] + 1 : 1
    next()
  }

  function end(done) {
    counter.setCounts(countryCounts);
    done()
  }

  ;

  return duplexer2({ objectMode: true }, through2({ objectMode: true }, write, end), counter)
}