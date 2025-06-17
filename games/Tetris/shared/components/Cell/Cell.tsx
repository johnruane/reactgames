import { memo } from 'react';
import classNames from 'classnames';

import './style.css';

const Cell = memo(function Cell({
  id = '',
  value = 0,
  pos = '',
  additionalClasses,
}: {
  id?: string;
  value?: number;
  pos?: string;
  additionalClasses?: string;
}) {
  return (
    <span
      id={id}
      data-pos={pos}
      className={classNames('board-cell', additionalClasses)}
      data-value={value}
    />
  );
});

export default Cell;
