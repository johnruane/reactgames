import { useRef, useState, useEffect } from 'react';
import classNames from 'classnames';

import './style.css';

const MooCell = ({ index, additionalClasses }) => {
  const [cellValue, setCellValue] = useState(0);
  const cellRef = useRef(null);

  function handleCellClick() {
    if (cellRef.current! < 4) {
      setCellValue((prev) => prev + 1);
    } else {
      setCellValue(1);
    }
  }

  useEffect(() => {
    cellRef.current = cellValue;
  }, [cellValue]);

  return (
    <span
      key={`guess-cell-${index}`}
      className={classNames(`board-cell`, additionalClasses)}
      data-value={cellValue}
      onClick={handleCellClick}
    />
  );
};

export default MooCell;
