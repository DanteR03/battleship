import { Ship } from "../src/game.js";

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
