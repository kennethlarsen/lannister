const fs = require('fs');
const mock = require('mock-fs');
const mocha = require('mocha');
const chai = require('chai');

const ParamsLength = require('../lib/validators/function-validator');

const paramsCheckInstance = new ParamsLength();

mocha.describe('Functions', () => {
  mocha.beforeEach(() => {
    mock({
      'report.md': '',
    });
  });

  mocha.it('should not write to report if it finds a function with one param', () => {
    paramsCheckInstance.checkParams('function someFunc(foo) {', 'somefile.js', './report.md');
    const reportAfterCheck = fs.readFileSync('./report.md').toString();
    chai.expect(reportAfterCheck).to.be.lengthOf(0);
    chai.expect(reportAfterCheck).not.to.contain('(too-many-args)');
  });

  mocha.it('should write to report if it finds a function with five params', () => {
    paramsCheckInstance.checkParams('function someFunc(foo, bar, baz, qux, quux) {', 'somefile.js', './report.md');
    const reportAfterCheck = fs.readFileSync('./report.md').toString();
    chai.expect(reportAfterCheck).not.to.be.lengthOf(0);
    chai.expect(reportAfterCheck).to.contain('(too-many-args)');
  });

  mocha.after(() => {
    mock.restore();
  });
});
