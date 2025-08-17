import { Ship, Gameboard, Player } from "../src/game.js";

describe("Ship class", () => {
  describe("TestShipOne", () => {
    const testShip = new Ship(3);

    it("Should return an object with specified length and parameters", () => {
      expect(testShip.getLength()).toBe(3);
      expect(testShip.getSunk()).toBe(false);
    });

    it("Should report the ship as sunk after hits reach the length of the ship", () => {
      testShip.hit();
      testShip.hit();
      testShip.hit();
      testShip.isSunk();
      expect(testShip.getSunk()).toBe(true);
    });
  });

  describe("TestShipTwo", () => {
    const testShip2 = new Ship(5);

    it("Should return an object with specified length and parameters", () => {
      expect(testShip2.getLength()).toBe(5);
      expect(testShip2.getSunk()).toBe(false);
    });

    it("Should report the ship as sunk after hits reach the length of the ship", () => {
      testShip2.hit();
      testShip2.hit();
      testShip2.hit();
      testShip2.isSunk();
      expect(testShip2.getSunk()).toBe(false);
    });
  });
});

describe("Gameboard class", () => {
  describe("TestGameboardOne", () => {
    const testGameboard = new Gameboard();
    testGameboard.fillBoard();
    const board = testGameboard.getBoard();
    const ships = testGameboard.getShips();

    it("Should return a gameboard object with an empty board", () => {
      expect(board).toHaveLength(10);
      expect(board[0]).toHaveLength(10);
    });

    it("Should place ships at specified coordinates and record their placement", () => {
      testGameboard.placeShip([0, 0], "x", 3);
      expect(ships).not.toHaveLength(0);
      expect(board[0][0]).toBe(0);
      expect(board[0][2]).toBe(0);
      expect(board[0][3]).toBe(null);
    });

    it("Should record attacks targeting specified coordinates", () => {
      testGameboard.receiveAttack([0, 2]);
      testGameboard.receiveAttack([1, 1]);
      expect(board[0][2]).toBe("hit");
      expect(board[1][1]).toBe("miss");
    });

    it("Should report if all ships are sunk", () => {
      expect(testGameboard.allSunk()).toBe(false);
      testGameboard.receiveAttack([0, 1]);
      testGameboard.receiveAttack([0, 0]);
      expect(testGameboard.allSunk()).toBe(true);
    });
  });
});

describe("Player class", () => {
  describe("PlayerOne", () => {
    const playerOne = new Player();
    playerOne.gameBoard.fillBoard();

    it("Should return a Player object with its own gameboard", () => {
      expect(playerOne.gameBoard).toBeInstanceOf(Gameboard);
    });
  });
});
