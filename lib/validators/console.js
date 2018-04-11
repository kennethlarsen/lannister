const Report = require('../file-handling/write-report');

const report = new Report();

function consoleCheck() {
  this.checkForConsoleCalls = (line, file, pathToReport) => {
    const regExp = /(console\.\w+\((.+)?\))/g;
    const consoleCall = regExp.exec(line);

    if (consoleCall) {
      report.writeToReport(`- [ ] ${file} has a console call. Consider refactor. (console-call)`, pathToReport);
    }
  };
}

module.exports = consoleCheck;
