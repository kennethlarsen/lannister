const fs = require('fs');
const mock = require('mock-fs');
const mocha = require('mocha');
const chai = require('chai');

const Report = require('../lib/file-handling/write-report');

const report = new Report();

mocha.describe('Report', () => {
  mocha.before(() => {
    mock();
  });

  mocha.it('should create an empty report if it does not already exsist', () => {
    report.initialReport('./report.md');
    chai.expect(fs.existsSync('./report.md')).to.equal(true);
  });

  mocha.it('should add a heading if a report file already exsists', () => {
    report.initialReport('./report.md');
    const afterReportWrite = fs.readFileSync('./report.md').toString();
    chai.expect(afterReportWrite).to.include('#');
  });

  mocha.it('should write to an exsisting report', () => {
    report.writeToReport('Some text\n', './report.md');
    const afterReportWrite = fs.readFileSync('./report.md').toString();
    chai.expect(afterReportWrite).to.include('Some text');
    chai.expect(afterReportWrite).not.to.include('Foo bar');
  });

  mocha.after(() => {
    mock.restore();
  });
});
