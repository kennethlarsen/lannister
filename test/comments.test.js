const fs = require('fs');
const mock = require('mock-fs');
const mocha = require('mocha');
const chai = require('chai');

const TodoCheck = require('../lib/validators/comments.js');

const todoCheckInstance = new TodoCheck();

mocha.describe('Comments', () => {
  mocha.beforeEach(() => {
    mock({
      'report.md': '',
    });
  });

  mocha.it('should not write to report if it finds a variable named "todo"', () => {
    todoCheckInstance.checkForTodoComments('const toDo = true;', 'somefile.js', './report.md');
    const reportAfterCheck = fs.readFileSync('./report.md').toString();
    chai.expect(reportAfterCheck).to.be.lengthOf(0);
    chai.expect(reportAfterCheck).not.to.contain('(todo-comment)');
  });

  mocha.it('should write to report if it finds an inline comment containing "TODO"', () => {
    todoCheckInstance.checkForTodoComments('// TODO: Fix this', 'somefile.js', './report.md');
    const reportAfterCheck = fs.readFileSync('./report.md').toString();
    chai.expect(reportAfterCheck).not.to.be.lengthOf(0);
    chai.expect(reportAfterCheck).to.contain('(todo-comment)');
  });

  mocha.it('should write to report if it finds a block comment containing "TODO"', () => {
    todoCheckInstance.checkForTodoComments('* TODO: Fix this', 'somefile.js', './report.md');
    const reportAfterCheck = fs.readFileSync('./report.md').toString();
    chai.expect(reportAfterCheck).not.to.be.lengthOf(0);
    chai.expect(reportAfterCheck).to.contain('(todo-comment)');
  });

  mocha.after(() => {
    mock.restore();
  });
});
