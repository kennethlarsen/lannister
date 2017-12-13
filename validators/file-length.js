const fs = require('fs');

function lineCheck() {
  this.checkLenghtOfFile = (file) => {
    let i;
    let count = 0;
    fs.createReadStream(file)
      .on('data', (chunk) => {
        for (i = 0; i < chunk.length; i += 1) {
          if (chunk[i] === 10) count += 1;
        }
      })
      .on('end', () => {
        if (count > 250) {
          process.stdout.write(`${file}: ${count}`);
        }
      });
  };
}

module.exports = lineCheck;
