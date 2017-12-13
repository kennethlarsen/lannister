function paramsLenght() {
  this.checkParams = function(line, file) {
    if (line.includes('function')) {
      const regExp = /\(([^)]+)\)/;
      const params = regExp.exec(line);
      const paramsArray = params[1].split(',');
  
      if (paramsArray.length > 4) {
        process.stdout.write('Error! More than 4 args in a function. Consider refactoring\n');
        process.stdout.write(file + '\n');
        process.stdout.write(line + '\n');
      }
    }
  }
}

module.exports = paramsLenght;
