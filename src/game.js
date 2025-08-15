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
    const coords = start;
    this.#ships.push(new Ship(length));
    if (axis === "x") {
      for (let i = 0; i < length; i++) {
        this.#board[coords[0]][coords[1]] = this.#ships.length - 1;
        coords[0]++;
      }
    } else if (axis === "y") {
      for (let i = 0; i < length; i++) {
        this.#board[coords[0]][coords[1]] = this.#ships.length - 1;
        coords[1]++;
      }
    }
  }

  getShips() {
    return this.#ships;
  }
}
