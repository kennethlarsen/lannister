const fs = require('fs');
const readline = require('readline');
const Stream = require('stream');
const meow = require('meow');
const fileExtension = require('file-extension');
const Report = require('./lib/file-handling/write-report');

// Import validators
const ParamsLenght = require('./lib/validators/function-validator');
const LineCheck = require('./lib/validators/file-length');
const TodoCheck = require('./lib/validators/comments.js');

// Initiate validators
const paramsCheckInstance = new ParamsLenght();
const lineCheckInstance = new LineCheck();
const todoCheckInstance = new TodoCheck();

const report = new Report();
const walkPath = process.argv[2];
const args = meow();
const { flags } = args;
let pathToReport = 'report.md';

if (flags.o) {
  pathToReport = `${flags.o}/report.md`;
}

report.initialReport(pathToReport);

function removeUnwantedFiles(fileList) {
  const cleanFiles = [];
  fileList.forEach((file) => {
    if (fileExtension(file) === 'js') {
      cleanFiles.push(file);
    }
  });
  return cleanFiles;
}

function walk(dir, done) {
  fs.readdir(dir, (error, list) => {
    const cleanFileList = removeUnwantedFiles(list);

    let i = 0;

    if (error) {
      return done(error);
    }

    (function next() {
      let file = cleanFileList[i += 1];

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
            paramsCheckInstance.checkParams(line, file, pathToReport);
            todoCheckInstance.checkForTodoComments(line, file, pathToReport);
          });

          rl.on('close', () => {
            lineCheckInstance.checkLenghtOfFile(file, pathToReport);
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
