import { isEqual } from 'lodash-es';

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
  return array.filter((item) => !isEqual(item, obj));
};
