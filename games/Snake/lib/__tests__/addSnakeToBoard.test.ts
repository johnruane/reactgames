import { addSnakeToBoard } from '../addSnakeToBoard';

describe('addSnakeToBoard', () => {
  it('should correctly add the snake head and body to the board', () => {
    const initialBoard = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    const snake = [1, 4, 3, 4]; // Snake goes down, right, up, left
    const pos = { r: 0, c: 0 };

    const expectedBoard = [
      [1, 1, 1], // Snake head starts at (0, 0), goes down to (1, 0)
      [1, 1, 0], // Snake moves right to (1, 1)
      [0, 0, 0], // Snake moves up to (0, 1), then left to (0, 0)
    ];

    const updatedBoard = addSnakeToBoard({ board: initialBoard, snake, pos });

    expect([...updatedBoard]).toEqual(expect.arrayContaining(expectedBoard));
  });

  it('should not update the board outside of boundaries', () => {
    const initialBoard = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    const snake = [1, 1, 1, 1]; // Snake moves down 4 times
    const pos = { r: 1, c: 1 };

    const expectedBoard = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 1, 0],
    ];

    const updatedBoard = addSnakeToBoard({ board: initialBoard, snake, pos });

    expect([...updatedBoard]).toEqual(expect.arrayContaining(expectedBoard));
  });

  it('should handle an empty snake and only place the head', () => {
    const initialBoard = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    const snake = [];
    const pos = { r: 2, c: 2 };

    const expectedBoard = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 1],
    ];

    const updatedBoard = addSnakeToBoard({ board: initialBoard, snake, pos });

    expect([...updatedBoard]).toEqual(expect.arrayContaining(expectedBoard));
  });

  it('should not update the board if the snake moves out of bounds', () => {
    const initialBoard = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    const snake = [4, 4, 4, 4];
    const pos = { r: 0, c: 2 };

    const expectedBoard = [
      [0, 0, 1],
      [0, 0, 0],
      [0, 0, 0],
    ];

    const updatedBoard = addSnakeToBoard({ board: initialBoard, snake, pos });

    expect([...updatedBoard]).toEqual(expect.arrayContaining(expectedBoard));
  });
});
