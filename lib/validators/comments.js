const Report = require('../file-handling/write-report');

const report = new Report();

function commentsCheck() {
  this.checkForTodoComments = (line, file, pathToReport, lineNumber) => {
    const regExp = /((\/\/|\*).+todo)/gi;
    const todo = regExp.exec(line);

    if (todo) {
      report.writeToReport(`- [ ] ${file} has TODO comment on line ${lineNumber}. Consider refactor. (todo-comment)`, pathToReport);
    }
  };
}

module.exports = commentsCheck;
