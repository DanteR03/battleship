import { Player } from "./game.js";

const playerOne = new Player();
const playerTwo = new Player();
let axis = "X";
let activePlayer = playerOne;
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
  populateBoardPredetermined(playerOne.gameBoard, playerTwo.gameBoard);
  displayBoard();
  displayBoard();
  const playerBoardContainers = document.querySelectorAll(".board");
  playerBoardContainers[0].addEventListener("click", (e) => {
    if (
      e.target.id.length === 3 &&
      activePlayer === playerTwo &&
      e.target.classList.contains("marked") === false
    ) {
      registerAttack(playerOne, e.target.id.split(","));
      if (playerOne.gameBoard.allSunk() === true) {
        console.log("Player Two wins!");
        activePlayer = "";
      } else {
        activePlayer = playerOne;
      }
    }
  });
  playerBoardContainers[1].addEventListener("click", (e) => {
    if (
      e.target.id.length === 3 &&
      activePlayer === playerOne &&
      e.target.classList.contains("marked") === false
    ) {
      registerAttack(playerTwo, e.target.id.split(","));
      if (playerTwo.gameBoard.allSunk() === true) {
        console.log("Player One wins!");
        activePlayer = "";
      } else {
        activePlayer = playerTwo;
      }
    }
  });
}

function startGameComputer() {
  hideStartButtons();
  populateBoardPredetermined(playerOne.gameBoard, playerTwo.gameBoard);
  displayBoard();
  displayBoard();
  const playerBoardContainers = document.querySelectorAll(".board");
  playerBoardContainers[1].addEventListener("click", (e) => {
    if (
      e.target.id.length === 3 &&
      activePlayer === playerOne &&
      e.target.classList.contains("marked") === false
    ) {
      registerAttack(playerTwo, e.target.id.split(","));
      if (playerTwo.gameBoard.allSunk() === true) {
        console.log("Player One wins!");
        activePlayer = "";
      } else {
        activePlayer = playerTwo;
        computerAttack();
      }
    }
  });
}

function displayBoard() {
  const playerOneBoard = playerOne.gameBoard.getBoard();
  const playerTwoBoard = playerTwo.gameBoard.getBoard();
  const playerBoardContainers = document.querySelectorAll(".board");
  playerBoardContainers[0].innerHTML = "";
  playerBoardContainers[1].innerHTML = "";
  const boardOneXArray = playerOneBoard;
  const boardTwoXArray = playerTwoBoard;
  let xCoord = 0;
  let yCoord = 0;
  for (const yArray of boardOneXArray) {
    for (const cell of yArray) {
      const boardCell = document.createElement("div");
      boardCell.classList.add("board-cell");
      boardCell.id = [xCoord, yCoord];
      if (Number.isInteger(cell)) {
        boardCell.classList.add("ship");
      } else if (cell === "hit") {
        boardCell.classList.add("ship");
        boardCell.classList.add("marked");
      } else if (cell === "miss") {
        boardCell.classList.add("marked");
      }
      playerBoardContainers[0].append(boardCell);
      yCoord++;
    }
    yCoord = 0;
    xCoord++;
  }
  xCoord = 0;
  yCoord = 0;
  for (const yArray of boardTwoXArray) {
    for (const cell of yArray) {
      const boardCell = document.createElement("div");
      boardCell.classList.add("board-cell");
      boardCell.id = [xCoord, yCoord];
      if (Number.isInteger(cell)) {
        boardCell.classList.add("ship");
      } else if (cell === "hit") {
        boardCell.classList.add("ship");
        boardCell.classList.add("marked");
      } else if (cell === "miss") {
        boardCell.classList.add("marked");
      }
      playerBoardContainers[1].append(boardCell);
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
  displayBoard();
  displayBoard();
}

function computerAttack() {
  const playerOneBoard = playerOne.gameBoard.getBoard();
  let x = Math.floor(Math.random() * 10);
  let y = Math.floor(Math.random() * 10);
  while (playerOneBoard[x][y] === "hit" || playerOneBoard[x][y] === "miss") {
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
  }
  const coords = [x, y];
  const coordsId = coords.join();
  const boardCell = document.querySelector(`#${CSS.escape(coordsId)}`);
  boardCell.classList.add("marked");
  registerAttack(playerOne, coords);
  if (playerOne.gameBoard.allSunk() === false) {
    activePlayer = playerOne;
  } else {
    console.log("Player Two wins!");
    activePlayer = "";
  }
}

function hideStartButtons() {
  const playerStartButton = document.querySelector(".player-start-button");
  const computerStartButton = document.querySelector(".computer-start-button");
  playerStartButton.classList.add("hidden");
  computerStartButton.classList.add("hidden");
}

export function initializeGame() {
  playerOne.gameBoard.fillBoard();
  playerTwo.gameBoard.fillBoard();
  displayBoard();
  displayBoard();
  const playerStartButton = document.querySelector(".player-start-button");
  const computerStartButton = document.querySelector(".computer-start-button");
  playerStartButton.addEventListener("click", () => startGamePlayer());
  computerStartButton.addEventListener("click", () => startGameComputer());
}
