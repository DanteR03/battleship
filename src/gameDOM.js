import { Player } from "./game.js";

const playerOne = new Player();
const playerTwo = new Player();
const playerOneBoard = playerOne.gameBoard.getBoard();
const playerTwoBoard = playerTwo.gameBoard.getBoard();
const playerBoardContainers = document.querySelectorAll(".board");
let axis = "X";
let activePlayer = playerOne;
let gameOver = false;
const axisButton = document.querySelector("button");
axisButton.addEventListener("click", () => {
  if (axis === "X") {
    axis = "Y";
    axisButton.textContent = "Axis: Y";
  } else {
    axis = "X";
    axisButton.textContent = "Axis: X";
  }
});

function startGamePlayer() {
  hideStartButtons();
  playerOne.gameBoard.fillBoard();
  playerTwo.gameBoard.fillBoard();
  populateBoardPredetermined(playerOne.gameBoard, playerTwo.gameBoard);
  displayBoard(playerOneBoard, playerBoardContainers[0]);
  displayBoard(playerTwoBoard, playerBoardContainers[1]);
  playerBoardContainers[0].addEventListener("click", (e) => {
    if (
      e.target.id.length === 3 &&
      activePlayer !== playerOne &&
      e.target.classList.contains("marked") === false &&
      gameOver === false
    ) {
      registerAttack(playerOne, e.target.id.split(","));
      e.target.classList.add("marked");
      if (playerOne.gameBoard.allSunk() === true) {
        console.log("Player Two wins!");
        gameOver === true;
      } else {
        activePlayer = playerOne;
      }
    }
  });
  playerBoardContainers[1].addEventListener("click", (e) => {
    if (
      e.target.id.length === 3 &&
      activePlayer !== playerTwo &&
      e.target.classList.contains("marked") === false &&
      gameOver === false
    ) {
      registerAttack(playerTwo, e.target.id.split(","));
      e.target.classList.add("marked");
      if (playerTwo.gameBoard.allSunk() === true) {
        console.log("Player One wins!");
        gameOver === true;
      } else {
        activePlayer = playerTwo;
      }
    }
  });
}

function startGameComputer() {
  hideStartButtons();
  playerOne.gameBoard.fillBoard();
  playerTwo.gameBoard.fillBoard();
  populateBoardPredetermined(playerOne.gameBoard, playerTwo.gameBoard);
  displayBoard(playerOneBoard, playerBoardContainers[0]);
  displayBoard(playerTwoBoard, playerBoardContainers[1]);
  playerBoardContainers[1].addEventListener("click", (e) => {
    if (
      e.target.id.length === 3 &&
      activePlayer !== playerTwo &&
      e.target.classList.contains("marked") === false &&
      gameOver === false
    ) {
      registerAttack(playerTwo, e.target.id.split(","));
      e.target.classList.add("marked");
      if (playerTwo.gameBoard.allSunk() === true) {
        console.log("Player One wins!");
        gameOver === true;
      } else {
        activePlayer = playerTwo;
        computerAttack(playerOneBoard);
      }
    }
  });
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
  placeShip(board1, [0, 0], "x", 5);
  placeShip(board1, [2, 4], "x", 4);
  placeShip(board1, [5, 0], "y", 3);
  placeShip(board1, [6, 2], "x", 3);
  placeShip(board1, [8, 8], "x", 2);
  placeShip(board2, [1, 4], "x", 5);
  placeShip(board2, [2, 2], "y", 4);
  placeShip(board2, [5, 4], "x", 3);
  placeShip(board2, [6, 7], "y", 3);
  placeShip(board2, [0, 0], "x", 2);
}

function placeShip(board, start, axis, length) {
  board.placeShip(start, axis, length);
}

function registerAttack(player, coords) {
  player.gameBoard.receiveAttack(coords);
}

function computerAttack(board) {
  let x = Math.floor(Math.random() * 10);
  let y = Math.floor(Math.random() * 10);
  while (board[x][y] === "hit" || board[x][y] === "miss") {
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
  }
  const coords = [x, y];
  const coordsId = coords.join();
  const boardCell = document.querySelector(`#${CSS.escape(coordsId)}`);
  boardCell.classList.add("marked");
  registerAttack(playerOne, coords);
  activePlayer = playerOne;
}

function hideStartButtons() {
  const playerStartButton = document.querySelector(".player-start-button");
  const computerStartButton = document.querySelector(".computer-start-button");
  playerStartButton.classList.add("hidden");
  computerStartButton.classList.add("hidden");
}

export function initializeGame() {
  const playerStartButton = document.querySelector(".player-start-button");
  const computerStartButton = document.querySelector(".computer-start-button");
  playerStartButton.addEventListener("click", () => startGamePlayer());
  computerStartButton.addEventListener("click", () => startGameComputer());
}
