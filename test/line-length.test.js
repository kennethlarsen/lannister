const fs = require('fs');
const mock = require('mock-fs');
const mocha = require('mocha');
const chai = require('chai');

const LineLengthCheck = require('../lib/validators/line-length.js');

const lineLengthInstance = new LineLengthCheck();

mocha.describe('Line Length', () => {
  mocha.beforeEach(() => {
    mock({
      'report.md': '',
    });
  });

  mocha.it('should not write to report if it finds a short line', () => {
    lineLengthInstance.checkMaxLength('const shortVarName = true', 'somefile.js', './report.md');
    const reportAfterCheck = fs.readFileSync('./report.md').toString();
    chai.expect(reportAfterCheck).to.be.lengthOf(0);
    chai.expect(reportAfterCheck).not.to.contain('(line-length)');
  });

  mocha.it('should not write to report if it finds a 80 character line', () => {
    lineLengthInstance.checkMaxLength('const someReallyLongVarName = "With some quite long text in it as well........."', 'somefile.js', './report.md');
    const reportAfterCheck = fs.readFileSync('./report.md').toString();
    chai.expect(reportAfterCheck).to.be.lengthOf(0);
    chai.expect(reportAfterCheck).not.to.contain('(line-length)');
  });

  mocha.it('should write to report if it finds a 81 character line', () => {
    lineLengthInstance.checkMaxLength('const someReallyLongVarName = "With some quite long text in it as well.........."', 'somefile.js', './report.md');
    const reportAfterCheck = fs.readFileSync('./report.md').toString();
    chai.expect(reportAfterCheck).not.to.be.lengthOf(0);
    chai.expect(reportAfterCheck).to.contain('(line-length)');
  });

  mocha.after(() => {
    mock.restore();
  });
});
