import { Player } from "./game.js";

export function initializeBoard() {
  const playerOne = new Player();
  const playerTwo = new Player();
  playerOne.gameBoard.fillBoard();
  playerTwo.gameBoard.fillBoard();
  const playerOneBoard = playerOne.gameBoard.getBoard();
  const playerTwoBoard = playerTwo.gameBoard.getBoard();
  const playerBoardContainers = document.querySelectorAll(".board-container");
  displayBoard(playerOneBoard, playerBoardContainers[0]);
  displayBoard(playerTwoBoard, playerBoardContainers[1]);
}

function displayBoard(board, boardContainer) {
  const xArray = board;
  for (const yArray of xArray) {
    for (const cell of yArray) {
      const boardCell = document.createElement("div");
      boardCell.classList.add("board-cell");
      boardCell.textContent = cell;
      boardContainer.append(boardCell);
    }
  }
}
