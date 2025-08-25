import { Player } from "./game.js";

const playerOne = new Player();
const playerTwo = new Player();
let axis = "x";
let activePlayer = playerOne;
let placingShip;
let placingShipLength;
let playerTwoAi;

function placeShipButton(event) {
  const ship = event.target.id;
  switch (ship) {
    case "carrier":
      placingShipLength = 5;
      placingShip = ship;
      break;
    case "battleship":
      placingShipLength = 4;
      placingShip = ship;
      break;
    case "destroyer":
      placingShipLength = 3;
      placingShip = ship;
      break;
    case "submarine":
      placingShipLength = 3;
      placingShip = ship;
      break;
    case "patrol":
      placingShipLength = 2;
      placingShip = ship;
      break;
  }
  const playerBoardContainers = document.querySelectorAll(".board");
  if (activePlayer === playerOne) {
    playerBoardContainers[0].addEventListener("click", placeShipCell);
  } else if (activePlayer === playerTwo && playerTwoAi === false) {
    playerBoardContainers[1].addEventListener("click", placeShipCell);
  }
}

function placeShipCell(event) {
  if (event.target.id) {
    const startCoords = event.target.id.split(",");
    const shipsLength = activePlayer.gameBoard.getShips().length;
    placeShip(activePlayer.gameBoard, startCoords, axis, placingShipLength);
    const newShipsLength = activePlayer.gameBoard.getShips().length;
    if (newShipsLength > shipsLength) {
      displayBoard();
      const playerBoardContainers = document.querySelectorAll(".board");
      if (activePlayer === playerOne) {
        playerBoardContainers[0].removeEventListener("click", placeShipCell);
      } else if (activePlayer === playerTwo) {
        playerBoardContainers[1].removeEventListener("click", placeShipCell);
      }
      const placingShipButton = document.querySelector(
        `#${CSS.escape(placingShip)}`,
      );
      placingShipButton.removeEventListener("click", placeShipButton);
    }
    if (
      newShipsLength > shipsLength &&
      newShipsLength === 5 &&
      activePlayer === playerOne &&
      playerTwoAi === false
    ) {
      activePlayer = playerTwo;
      const shipButtons = document.querySelectorAll(".ship-button");
      shipButtons.forEach((button) => {
        button.addEventListener("click", placeShipButton);
      });
    } else if (
      newShipsLength > shipsLength &&
      newShipsLength === 5 &&
      activePlayer === playerOne &&
      playerTwoAi === true
    ) {
      activePlayer = playerTwo;
      hideShipButtons();
      computerPlaceShips();
      activePlayer = playerOne;
      startGameComputer();
    } else if (
      newShipsLength > shipsLength &&
      newShipsLength === 5 &&
      activePlayer === playerTwo
    ) {
      activePlayer = playerOne;
      placingShip = "";
      placingShipLength = "";
      hideShipButtons();
      startGamePlayer();
    }
  }
}

function initializeGamePlayer() {
  hideStartButtons();
  displayBoard();
  playerTwoAi = false;
  const shipButtonContainer = document.querySelector(".ship-buttons-container");
  const shipButtons = document.querySelectorAll(".ship-button");
  shipButtonContainer.classList.remove("hidden");
  shipButtons.forEach((button) => {
    button.addEventListener("click", placeShipButton);
  });
}

function startGamePlayer() {
  hideAxisButton();
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

function initializeGameComputer() {
  hideStartButtons();
  displayBoard();
  playerTwoAi = true;
  const shipButtonContainer = document.querySelector(".ship-buttons-container");
  const shipButtons = document.querySelectorAll(".ship-button");
  shipButtonContainer.classList.remove("hidden");
  shipButtons.forEach((button) => {
    button.addEventListener("click", placeShipButton);
  });
}

function startGameComputer() {
  hideAxisButton();
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

function populateBoardPredetermined() {
  const playerOneBoard = playerOne.gameBoard;
  const playerTwoBoard = playerTwo.gameBoard;
  placeShip(playerOneBoard, [0, 0], "x", 5);
  placeShip(playerOneBoard, [2, 4], "x", 4);
  placeShip(playerOneBoard, [5, 0], "y", 3);
  placeShip(playerOneBoard, [6, 2], "x", 3);
  placeShip(playerOneBoard, [8, 8], "x", 2);
  placeShip(playerTwoBoard, [1, 4], "x", 5);
  placeShip(playerTwoBoard, [2, 2], "y", 4);
  placeShip(playerTwoBoard, [5, 4], "x", 3);
  placeShip(playerTwoBoard, [6, 7], "y", 3);
  placeShip(playerTwoBoard, [0, 0], "x", 2);
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
  let x = generateRandomNumberExclusive(10);
  let y = generateRandomNumberExclusive(10);
  while (playerOneBoard[x][y] === "hit" || playerOneBoard[x][y] === "miss") {
    x = generateRandomNumberExclusive(10);
    y = generateRandomNumberExclusive(10);
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

function computerPlaceShips() {
  const playerBoard = activePlayer.gameBoard;
  const ships = ["patrol", "submarine", "destroyer", "battleship", "carrier"];
  let shipIndex = ships.length - 1;
  while (playerBoard.getShips().length < 5) {
    let shipsLengthOld = playerBoard.getShips().length;
    let randomNumberAxis = generateRandomNumberExclusive(2);
    let randomNumberX = generateRandomNumberExclusive(10);
    let randomNumberY = generateRandomNumberExclusive(10);
    if (randomNumberAxis === 0) {
      axis = "x";
    } else {
      axis = "y";
    }
    switch (ships[shipIndex]) {
      case "carrier":
        placingShipLength = 5;
        placingShip = ships[shipIndex];
        break;
      case "battleship":
        placingShipLength = 4;
        placingShip = ships[shipIndex];
        break;
      case "destroyer":
        placingShipLength = 3;
        placingShip = ships[shipIndex];
        break;
      case "submarine":
        placingShipLength = 3;
        placingShip = ships[shipIndex];
        break;
      case "patrol":
        placingShipLength = 2;
        placingShip = ships[shipIndex];
        break;
    }
    placeShip(
      playerBoard,
      [randomNumberX, randomNumberY],
      axis,
      placingShipLength,
    );
    let shipsLengthNew = playerBoard.getShips().length;
    if (shipsLengthOld < shipsLengthNew) {
      shipIndex--;
      displayBoard();
    }
  }
}

function generateRandomNumberExclusive(upper) {
  return Math.floor(Math.random() * upper);
}

function hideStartButtons() {
  const startButtonsContainer = document.querySelector(
    ".start-buttons-container",
  );
  startButtonsContainer.classList.add("hidden");
}

function hideShipButtons() {
  const shipButtonsContainer = document.querySelector(
    ".ship-buttons-container",
  );
  shipButtonsContainer.classList.add("hidden");
}

function hideAxisButton() {
  const axisButton = document.querySelector("button");
  axisButton.classList.add("hidden");
}

export function initializeGame() {
  playerOne.gameBoard.fillBoard();
  playerTwo.gameBoard.fillBoard();
  displayBoard();
  const playerStartButton = document.querySelector(".player-start-button");
  const computerStartButton = document.querySelector(".computer-start-button");
  const axisButton = document.querySelector("button");
  axisButton.addEventListener("click", () => {
    if (axis === "x") {
      axis = "y";
      axisButton.textContent = "Axis: Y";
    } else {
      axis = "x";
      axisButton.textContent = "Axis: X";
    }
  });
  playerStartButton.addEventListener("click", () => initializeGamePlayer());
  computerStartButton.addEventListener("click", () => initializeGameComputer());
}
