const mocha = require('mocha');
const chai = require('chai');

const removeUnwantedFiles = require('../utils/remove-unwanted-files');

mocha.describe('removeUnwantedFiles', () => {
  mocha.it('should return an empty array if no files are passed', () => {
    const files = removeUnwantedFiles([]);
    chai.expect(files).to.have.lengthOf(0);
    chai.expect(files).not.to.have.lengthOf(1);
  });

  mocha.it('should filter out non .js files', () => {
    const files = removeUnwantedFiles(['foo.js', 'bar.txt']);
    chai.expect(files).to.have.lengthOf(1);
    chai.expect(files).not.to.have.lengthOf(2);
  });

  mocha.it('should return an array', () => {
    const files = removeUnwantedFiles([]);
    chai.expect(files).to.be.a('array');
    chai.expect(files).not.to.be.a('string');
  });
});
