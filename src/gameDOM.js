import { Player } from "./game.js";

export function initializeBoard() {
  const playerOne = new Player();
  const playerTwo = new Player();
  playerOne.gameBoard.fillBoard();
  playerTwo.gameBoard.fillBoard();
  populateBoardPredetermined(playerOne.gameBoard, playerTwo.gameBoard);
  const playerOneBoard = playerOne.gameBoard.getBoard();
  const playerTwoBoard = playerTwo.gameBoard.getBoard();
  const playerBoardContainers = document.querySelectorAll(".board-container");
  playerBoardContainers[0].addEventListener("click", (e) => {
    registerAttack(playerOne, e.target.id.split(","));
    displayBoard(playerOneBoard, playerBoardContainers[0]);
  });
  playerBoardContainers[1].addEventListener("click", (e) => {
    registerAttack(playerTwo, e.target.id.split(","));
    displayBoard(playerTwoBoard, playerBoardContainers[1]);
  });
  displayBoard(playerOneBoard, playerBoardContainers[0]);
  displayBoard(playerTwoBoard, playerBoardContainers[1]);
}

function displayBoard(board, boardContainer) {
  boardContainer.innerHTML = "";
  const xArray = board;
  let xCoord = 0;
  let yCoord = 0;
  for (const yArray of xArray) {
    for (const cell of yArray) {
      const boardCell = document.createElement("div");
      boardCell.classList.add("board-cell");
      boardCell.id = [xCoord, yCoord];
      boardCell.textContent = cell;
      boardContainer.append(boardCell);
      yCoord++;
    }
    yCoord = 0;
    xCoord++;
  }
}

function populateBoardPredetermined(board1, board2) {
  board1.placeShip([0, 0], "x", 5);
  board1.placeShip([2, 4], "x", 4);
  board1.placeShip([5, 0], "y", 3);
  board1.placeShip([6, 2], "x", 3);
  board1.placeShip([8, 8], "x", 2);
  board2.placeShip([1, 4], "x", 5);
  board2.placeShip([2, 2], "y", 4);
  board2.placeShip([5, 4], "x", 3);
  board2.placeShip([6, 7], "y", 3);
  board2.placeShip([0, 0], "x", 2);
}

function registerAttack(player, coords) {
  player.gameBoard.receiveAttack(coords);
}
