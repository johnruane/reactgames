import { isEqual } from 'lodash-es';

/**
 * Helper function to find and object @obj in Set @set This is due to object comparison and equality of reference
 * over value. This helper compares the values of the objects.
 */

export const isObjectInSet = ({
  set,
  obj,
}: {
  set: Set<CellPosition>;
  obj: CellPosition;
}): boolean => {
  for (const item of set) {
    if (isEqual(item, obj)) {
      return true;
    }
  }
  return false;
};
