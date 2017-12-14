const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const ParamsLenght = require('./lib/validators/function-validator');
const LineCheck = require('./lib/validators/file-length');

const paramsCheckInstance = new ParamsLenght();
const lineCheckInstance = new LineCheck();

const walkPath = 'test/';

function walk(dir, done) {
  fs.readdir(dir, (error, list) => {
    let i = 0;

    if (error) {
      return done(error);
    }

    (function next () {
      var file = list[i++];

      if (!file) {
        //report.generateReport();
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
            lineCheckInstance.checkLenghtOfFile(file);
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
