import { Player } from "./game.js";

let activePlayer;

export function initializeBoard() {
  const playerOne = new Player();
  const playerTwo = new Player();
  playerOne.gameBoard.fillBoard();
  playerTwo.gameBoard.fillBoard();
  activePlayer = playerOne;
  populateBoardPredetermined(playerOne.gameBoard, playerTwo.gameBoard);
  const playerOneBoard = playerOne.gameBoard.getBoard();
  const playerTwoBoard = playerTwo.gameBoard.getBoard();
  const playerBoardContainers = document.querySelectorAll(".board-container");
  playerBoardContainers[0].addEventListener("click", (e) => {
    if (
      e.target.id.length === 3 &&
      activePlayer !== playerOne &&
      e.target.classList.contains("marked") === false
    ) {
      registerAttack(playerOne, e.target.id.split(","));
      e.target.classList.add("marked");
      if (playerOne.gameBoard.allSunk() === true) {
        console.log("Player Two wins!");
      } else {
        activePlayer = playerOne;
      }
    }
  });
  playerBoardContainers[1].addEventListener("click", (e) => {
    if (
      e.target.id.length === 3 &&
      activePlayer !== playerTwo &&
      e.target.classList.contains("marked") === false
    ) {
      registerAttack(playerTwo, e.target.id.split(","));
      e.target.classList.add("marked");
      if (playerTwo.gameBoard.allSunk() === true) {
        console.log("Player One wins!");
      } else {
        activePlayer = playerTwo;
      }
    }
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
      if (Number.isInteger(cell)) {
        boardCell.classList.add("ship");
      }
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
