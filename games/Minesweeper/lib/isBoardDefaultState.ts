export const isBoardDefaultState = ({ board }: { board: number[][] }) => {
  let isCellDefault = true;
  for (const row of board) {
    for (const cell of row) {
      if (cell !== -1) {
        isCellDefault = false;
      }
    }
  }
  return isCellDefault;
};
