import { findEmptyCells } from '../findEmptyCells';

describe('findEmptyCells Test Suite', () => {
  it.each`
    board               | output
    ${[[1, 1], [1, 1]]} | ${[]}
    ${[[0, 1], [1, 1]]} | ${['0-0']}
    ${[[0, 1], [1, 0]]} | ${['0-0', '1-1']}
    ${[[0, 0], [0, 0]]} | ${['0-0', '0-1', '1-0', '1-1']}
  `('should add snake to board starting at pos', ({ board, output }) => {
    expect(JSON.stringify(findEmptyCells({ board: board }))).toEqual(
      JSON.stringify(output),
    );
  });
});
