const Report = require('../file-handling/write-report');

const report = new Report();

function consoleCheck() {
  this.checkForConsoleCalls = (line, file, pathToReport, lineNumber) => {
    const regExp = /(console\.\w+\((.+)?\))/g;
    const consoleCall = regExp.exec(line);

    if (consoleCall) {
      report.writeToReport(`- [ ] ${file} has a console call on line ${lineNumber}. Consider refactor. (console-call)`, pathToReport);
    }
  };
}

module.exports = consoleCheck;
