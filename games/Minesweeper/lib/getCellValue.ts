/**
 * Takes @board and @pos and returns the value of the cel on @board at position @pos
 */

export const getCellValue = ({
  board,
  pos,
}: {
  board: number[][];
  pos: CellPosition;
}): number | null => {
  if (!board || !pos) return null;

  const { r, c } = pos || {};
  const cellValue = board[r]?.[c];

  return typeof cellValue === 'number' && Number.isFinite(cellValue)
    ? cellValue
    : null;
};
