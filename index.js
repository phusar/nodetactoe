const chalk = require('chalk');
const printBoard = require('./printBoard');
require("readline").emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

function getCurrentPlayer(move) {
  return move % 2 === 0 ? 2 : 1;
}

function reprintBoard(board, move) {
  printBoard(board, `Player${getCurrentPlayer(move)} where do you want to play?([1-9], 'q' to exit):`);
}

function checkWin(board) {
  const winningCombinations = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (const combination of winningCombinations) {
    if (board[combination[0]] === board[combination[1]] && board[combination[1]] === board[combination[2]]) {
      return true;
    }
  }
  return false;
}

const boardState = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let move = 1;
reprintBoard(boardState, move);
process.stdin.on('keypress', (char, key) => {
  if (char && char.toLowerCase() === 'q' || key.ctrl && key.name === 'c') {
    console.log(chalk.redBright('Did someone just flip the table? Thanks for playing!'));
    process.exit();
  }

  const playedNumber = Number.parseInt(char);
  if (isNaN(playedNumber)) {
    return;
  }

  const boardPosition = playedNumber - 1;
  if (typeof boardState[boardPosition] !== 'number') {
    printBoard(boardState, chalk.redBright(`#${playedNumber} is occupied! Please pick a different one([1-9], 'q' to exit):`));
    return;
  }

  boardState[boardPosition] = move % 2 === 0 ? 'O' : 'X';

  if (move >= 4 && checkWin(boardState)) {
    printBoard(boardState, chalk.redBright(`Player${getCurrentPlayer(move)} wins! Congratulations!`))
    process.exit();
  }
  move++;

  if (move === 10) {
    printBoard(boardState, chalk.redBright('Seems like it was a tie! GG!'));
    process.exit();
  }
  reprintBoard(boardState, move);
});