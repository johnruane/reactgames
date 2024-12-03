import { memo } from 'react';

import './style.css';

const Cell = memo(function Cell({
  id = '',
  value = 0,
  pos = '',
}: {
  id?: string;
  value?: number;
  pos?: string;
}) {
  return (
    <span id={id} data-pos={pos} className="board-cell" data-value={value} />
  );
});

export default Cell;
