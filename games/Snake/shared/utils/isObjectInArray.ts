import _isEqual from 'lodash/isEqual';
import _some from 'lodash/some';

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
