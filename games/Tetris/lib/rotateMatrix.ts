/**
 * Takes @matrix and rotates the rows
 */
export function rotateMatrix({
  tetromino,
}: {
  tetromino: { value: number; matrix: number[][] };
}) {
  if (tetromino.value === 8) return tetromino.matrix;

  const newMatrix: number[][] = [];
  const matrixLength = tetromino.matrix.length - 1;

  for (let i = 0; i <= matrixLength; i++) {
    const row: number[] = [];
    for (let j = 0; j <= matrixLength; j++) {
      row.push(tetromino.matrix[matrixLength - j][i]);
    }
    newMatrix.push(row);
  }
  return newMatrix;
}
