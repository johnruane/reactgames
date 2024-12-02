import { getCellValue } from '../getCellValue';

const testBoard = [
  [1, 2, 1, 1, 0, 0, 0, 1, 9],
  [9, 3, 9, 3, 2, 1, 0, 1, 1],
  [9, 3, 2, 9, 9, 2, 2, 1, 1],
  [1, 1, 1, 2, 3, 9, 3, 9, 1],
  [1, 1, 1, 0, 1, 2, 9, 2, 1],
  [1, 9, 1, 0, 0, 1, 1, 1, 0],
  [1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

describe('getCellValue', () => {
  it.each`
    pos                | output
    ${{ r: 0, c: 0 }}  | ${1}
    ${{ r: 0, c: 1 }}  | ${2}
    ${{ r: 4, c: 6 }}  | ${9}
    ${{ r: 8, c: 8 }}  | ${0}
    ${{ r: -1, c: 0 }} | ${null}
  `('should return the value of the cell at pos', ({ pos, output }) => {
    expect(getCellValue({ board: testBoard, pos })).toEqual(output);
  });
});
