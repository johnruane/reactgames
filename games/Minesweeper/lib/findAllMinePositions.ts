export const findAllMinePositions = ({
  board,
}: {
  board: number[][];
}): { r: number; c: number }[] => {
  const positions: { r: number; c: number }[] = [];
  board?.forEach((boardRow, i) => {
    boardRow?.forEach((cell, j) => {
      if (cell === 9) {
        positions.push({ r: i, c: j });
      }
    });
  });
  return positions;
};
