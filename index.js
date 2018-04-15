const fs = require('fs');
const path = require('path');
const readline = require('readline');
const Stream = require('stream');
const meow = require('meow');
const globby = require('globby');
const ora = require('ora');

const Report = require('./lib/file-handling/write-report');

// Import validators
const ParamsLength = require('./lib/validators/function-validator');
const LineCheck = require('./lib/validators/file-length');
const TodoCheck = require('./lib/validators/comments.js');
const ConsoleCheck = require('./lib/validators/console');
const LineLengthCheck = require('./lib/validators/line-length');

// Initiate validators
const paramsCheckInstance = new ParamsLength();
const lineCheckInstance = new LineCheck();
const todoCheckInstance = new TodoCheck();
const consoleCheckInstance = new ConsoleCheck();
const lineLengthInstance = new LineLengthCheck();

const report = new Report();
const walkPath = process.argv[2];
const args = meow();
const { flags } = args;
let pathToReport = 'report.md';

if (flags.o) {
  pathToReport = `${flags.o}/report.md`;
}

report.initialReport(pathToReport);

const spinner = ora('Processing..').start();

async function walk(dir) {
  try {
    const filesPath = path.join(dir, '**', '*.js');
    const files = await globby([filesPath]);
    let i = 0;

    (function next() {
      const file = files[i];
      let lineNumber = 1;

      if (!file) {
        return false;
      }

      const instream = fs.createReadStream(file);
      const outstream = new Stream();
      const rl = readline.createInterface(instream, outstream);

      rl.on('line', (line) => {
        paramsCheckInstance.checkParams(line, file, pathToReport, lineNumber);
        todoCheckInstance.checkForTodoComments(line, file, pathToReport, lineNumber);
        consoleCheckInstance.checkForConsoleCalls(line, file, pathToReport, lineNumber);
        lineLengthInstance.checkMaxLength(line, file, pathToReport, lineNumber);
        lineNumber += 1;
      });

      rl.on('close', () => {
        lineCheckInstance.checkLengthOfFile(file, pathToReport);
        i += 1;
        next();
      });
      return true;
    }());
  } catch (error) {
    spinner.fail(`Error: ${error}`);
    return false;
  }
  return true;
}

(async () => {
  await walk(walkPath);
  // Let's wait at least a second for UX purposes..
  setTimeout(() => {
    spinner.succeed(`Finished! - Logged the results to ${pathToReport}`);
  }, 1000);
})();
