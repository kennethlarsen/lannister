const fs = require('fs');
const mock = require('mock-fs');
const mocha = require('mocha');
const chai = require('chai');

const ConsoleCheck = require('../lib/validators/console');

const consoleCheckInstance = new ConsoleCheck();

mocha.describe('Console', () => {
  mocha.beforeEach(() => {
    mock({
      'report.md': '',
    });
  });

  mocha.it('should not write to report if it finds method call on a custom Console class', () => {
    consoleCheckInstance.checkForConsoleCalls('Console.someMethod({})', 'somefile.js', './report.md');
    const reportAfterCheck = fs.readFileSync('./report.md').toString();
    chai.expect(reportAfterCheck).to.be.lengthOf(0);
    chai.expect(reportAfterCheck).not.to.contain('(console-call)');
  });

  mocha.it('should write to report if it finds console.log()', () => {
    consoleCheckInstance.checkForConsoleCalls('console.log("foo")', 'somefile.js', './report.md');
    const reportAfterCheck = fs.readFileSync('./report.md').toString();
    chai.expect(reportAfterCheck).not.to.be.lengthOf(0);
    chai.expect(reportAfterCheck).to.contain('(console-call)');
  });

  mocha.it('should write to report if it finds console.error()', () => {
    consoleCheckInstance.checkForConsoleCalls('console.error({some: "object"})', 'somefile.js', './report.md');
    const reportAfterCheck = fs.readFileSync('./report.md').toString();
    chai.expect(reportAfterCheck).not.to.be.lengthOf(0);
    chai.expect(reportAfterCheck).to.contain('(console-call)');
  });

  mocha.it('should write to report if it finds console.groupCollapsed()', () => {
    consoleCheckInstance.checkForConsoleCalls('console.groupCollapsed()', 'somefile.js', './report.md');
    const reportAfterCheck = fs.readFileSync('./report.md').toString();
    chai.expect(reportAfterCheck).not.to.be.lengthOf(0);
    chai.expect(reportAfterCheck).to.contain('(console-call)');
  });

  mocha.after(() => {
    mock.restore();
  });
});
