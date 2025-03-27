import { isEqual, some } from 'lodash';

/**
 * Helper function to find and object @obj in @array
 */

export const isObjectInArray = ({
  array,
  obj,
}: {
  array: CellPosition[];
  obj: CellPosition;
}) => {
  return some(array, (cell) => isEqual(cell, obj));
};
