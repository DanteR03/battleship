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
