import { Node, Tree } from "./binarySearchTree.js";
import mergeSort from "./mergeSort.js";

class Board {
  constructor() {
    this.board = this.buildBoard();
    this.startingSquare = this.placeKnightOnStartingSquare();
  }

  buildBoard() {
    const board = [];

    for (let i = 1; i <= 8; i++) {
      for (let j = 1; j <= 8; j++) {
        board.push([i, j]);
      }
    }
    return board;
  }

  placeKnightOnStartingSquare() {
    const row = 4;
    const col = 4;
    const startingSquare = this.board.findIndex(
      (coord) => coord[0] === row && coord[1] === col
    );
    return startingSquare;
  }
}

const newBoard = new Board();
