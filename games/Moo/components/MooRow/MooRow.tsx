import { useRef, useState, useEffect } from 'react';
import classNames from 'classnames';

import MooCell from '../MooCell';

import './style.css';

const MooRow = ({ rowIndex, activeRow, additionalClasses }) => {
  const [rowValues, setRowValues] = useState<number[]>([0, 0, 0, 0]);

  function handleCellClick(e: React.MouseEvent<HTMLSpanElement>) {
    const cellIndex = Number(e.currentTarget.getAttribute('data-cell'));
    const newCellValues = Array.from(rowValues);

    newCellValues[cellIndex] = rowValues[cellIndex] < 6 ? rowValues[cellIndex] + 1 : 1;
    setRowValues(newCellValues);
  }

  return (
    <div key={`moo-row-${rowIndex}`} className='moo-row' data-row={`moo-row-${rowIndex}`}>
      {Array.from({ length: 4 }).map((_, index) => (
        <MooCell
          key={`guess-cell-${rowIndex}-${index}`}
          dataRow={rowIndex}
          dataCell={index}
          dataValue={rowValues[index]}
          additionalClasses={`guess-cell-${index + 1}`}
          onClickHandler={handleCellClick}
          disable={rowIndex !== activeRow}
        />
      ))}

      {Array.from({ length: 4 }).map((_, index) => (
        <MooCell
          key={`result-cell-${rowIndex}-${index}`}
          additionalClasses={`result-cell-${index + 1}`}
        />
      ))}

      <button
        className={classNames('moo-go-button', { ['hide']: rowIndex !== activeRow })}
      >
        Go!
      </button>
    </div>
  );
};

export default MooRow;
