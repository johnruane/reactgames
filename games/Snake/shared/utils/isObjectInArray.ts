import { _isEqual } from 'lodash-es/isEqual';
import { _some } from 'lodash-es/some';

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
  return _some(array, (cell) => _isEqual(cell, obj));
};
