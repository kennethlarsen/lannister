const fs = require('fs');
const readline = require('readline');
const Stream = require('stream');
const ParamsLenght = require('./lib/validators/function-validator');
const LineCheck = require('./lib/validators/file-length');
const Report = require('./lib/file-handling/write-report');

const paramsCheckInstance = new ParamsLenght();
const lineCheckInstance = new LineCheck();
const report = new Report();

const walkPath = 'test/';

report.initialReport();

function walk(dir, done) {
  fs.readdir(dir, (error, list) => {
    let i = 0;

    if (error) {
      return done(error);
    }

    (function next() {
      let file = list[i++];

      if (!file) {
        return done(null);
      }

      file = `${dir}/${file}`;

      fs.stat(file, (fileError, stat) => {
        if (stat && stat.isDirectory()) {
          walk(file, () => {
            next();
          });
        } else {
          const instream = fs.createReadStream(file);
          const outstream = new Stream();
          const rl = readline.createInterface(instream, outstream);

          rl.on('line', (line) => {
            paramsCheckInstance.checkParams(line, file);
          });

          rl.on('close', () => {
            lineCheckInstance.checkLenghtOfFile(file);
            next();
          });
        }
      });
      return true;
    }());
    return true;
  });
}

process.stdout.write('-------------------------------------------------------------\n');
process.stdout.write('processing...\n');
process.stdout.write('-------------------------------------------------------------\n');

walk(walkPath, (error) => {
  if (error) {
    throw error;
  } else {
    process.stdout.write('-------------------------------------------------------------\n');
    process.stdout.write('finished.\n');
    process.stdout.write('-------------------------------------------------------------\n');
  }
});
