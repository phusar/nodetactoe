const chalk = require('chalk');
const log = console.log;

function printPiece(value) {
  if (typeof value === 'number') {
    return value;
  }
  if (value === 'X') {
    return chalk.bgGreen(value);
  }
  if (value === 'O') {
    return chalk.bgRed(value);
  }
}

function constructPiece(value) {
  return `| ${printPiece(value)} `;
}

function drawLineSeparator() {
  log('-------------');
}

module.exports = (board, message) => {
  let lineoutput = '';

  console.clear();
  drawLineSeparator();
  for (let i = 0; i < board.length; i++) {
    lineoutput += constructPiece(board[i]);
    if ((i+ 1) % 3 === 0) {
      log(lineoutput + '|');
      drawLineSeparator();
      lineoutput = '';
    }
  }
  log(message);
}