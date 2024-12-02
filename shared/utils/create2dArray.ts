export const create2dArray = ({
  numberOfRows,
  numberOfColumns,
  fillValue = 0,
}: {
  numberOfRows: number;
  numberOfColumns: number;
  fillValue?: number;
}): number[][] => {
  const rows = new Array(numberOfColumns).fill(fillValue);
  const generatedArray = new Array(numberOfRows)
    .fill(null)
    .map(() => [...rows]);
  return generatedArray;
};
