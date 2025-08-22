export class Ship {
  #length;
  #hits = 0;
  #sunk = false;

  constructor(length) {
    this.#length = length;
  }

  getLength() {
    return this.#length;
  }

  hit() {
    this.#hits++;
  }

  isSunk() {
    if (this.#hits >= this.#length) {
      this.#sunk = true;
    }
  }

  getSunk() {
    return this.#sunk;
  }
}

export class Gameboard {
  #board = [];
  #ships = [];

  fillBoard() {
    for (let i = 0; i < 10; i++) {
      const array = [];
      for (let i = 0; i < 10; i++) {
        array.push(null);
      }
      this.#board.push(array);
    }
  }

  getBoard() {
    return this.#board;
  }

  placeShip(start, axis, length) {
    const coords = [start];
    if (axis === "y") {
      for (let i = 0; i < length - 1; i++) {
        let coordsNext = coords[coords.length - 1].slice();
        coordsNext[0]++;
        coords.push(coordsNext);
      }
    } else if (axis === "x") {
      for (let i = 0; i < length - 1; i++) {
        let coordsNext = coords[coords.length - 1].slice();
        coordsNext[1]++;
        coords.push(coordsNext);
      }
    }
    const filteredCoords = coords.filter(
      (coord) =>
        coord[0] <= 9 &&
        coord[0] >= 0 &&
        coord[1] <= 9 &&
        coord[1] >= 0 &&
        this.#board[coord[0]][coord[1]] === null,
    );
    if (filteredCoords.length === coords.length) {
      this.#ships.push(new Ship(length));
      for (const coord of filteredCoords) {
        this.#board[coord[0]][coord[1]] = this.#ships.length - 1;
      }
    }
  }

  getShips() {
    return this.#ships;
  }

  receiveAttack(coords) {
    const coordsX = coords[0];
    const coordsY = coords[1];
    const hitPosition = this.#board[coordsX][coordsY];

    if (Number.isInteger(hitPosition)) {
      this.#board[coordsX][coordsY] = "hit";
      this.#ships[hitPosition].hit();
      this.#ships[hitPosition].isSunk();
    } else if (hitPosition !== "hit") {
      this.#board[coordsX][coordsY] = "miss";
    }
  }

  allSunk() {
    let result = true;
    for (const ship of this.#ships) {
      if (ship.getSunk() === false) {
        result = false;
      }
    }
    return result;
  }
}

export class Player {
  constructor(name) {
    this.gameBoard = new Gameboard();
  }
}
