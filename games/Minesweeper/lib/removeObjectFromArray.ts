import _isEqual from 'lodash/isEqual';

/**
 * Takes @array and @obj and filters out @obj from @array using Lodash/isEqual deep comparison.
 */

export const removeObjectFromArray = ({
  array,
  obj,
}: {
  array: CellPosition[];
  obj: CellPosition;
}) => {
  return array.filter((item) => !_isEqual(item, obj));
};
