const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const ParamsLenght = require('./validators/check-params');

const paramsCheckInstance = new ParamsLenght();
const walkPath = 'test/';

function walk(dir, done) {
  fs.readdir(dir, function (error, list) {
    if (error) {
      return done(error);
    }

    var i = 0;

    (function next () {
      var file = list[i++];

      if (!file) {
          return done(null);
      }
      
      file = dir + '/' + file;
      
      fs.stat(file, function (error, stat) {
  
          if (stat && stat.isDirectory()) {
              walk(file, function (error) {
                  next();
              });
          } else {
              const instream = fs.createReadStream(file);
              const outstream = new stream;
              const rl = readline.createInterface(instream, outstream);

              rl.on('line', function(line) {
                paramsCheckInstance.checkParams(line, file);
              });

              rl.on('close', function() {
                // write to file here?
                checkLenghtOfFile(file);
                next();
              });
          }
        });
    })();
  });
};

process.stdout.write('-------------------------------------------------------------\n');
process.stdout.write('processing...\n');
process.stdout.write('-------------------------------------------------------------\n');

walk(walkPath, function(error) {
    if (error) {
        throw error;
    } else {
        process.stdout.write('-------------------------------------------------------------\n');
        process.stdout.write('finished.\n');
        process.stdout.write('-------------------------------------------------------------\n');
    }
});

/* function checkLenghtOfFunction(line) {

} */

function checkLenghtOfFile(file) {
  let i;
  let count = 0;
  fs.createReadStream(file)
    .on('data', function (chunk) {
      for (i=0; i < chunk.length; ++i)
        if (chunk[i] == 10) count++;
    })
    .on('end', function() {
      if (count > 250) {
        process.stdout.write(`${file}: ${count}`);        
      }
  });
}
