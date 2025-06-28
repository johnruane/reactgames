import { useContext, useState } from 'react';

import MastermindContext from '../../context/MastermindContext';
import Cell from '../Cell';
import classNames from 'classnames';

import calculateResults from '../../lib/calculateResults';

import styles from './style.module.css';

const MastermindRow = ({
  rowIndex,
  activeRow,
  additionalClasses,
}: {
  rowIndex: number;
  activeRow: number;
  additionalClasses?: string;
}) => {
  const secretCode = useContext(MastermindContext)!;

  const [rowValues, setRowValues] = useState<number[]>(
    activeRow === rowIndex ? [1, 1, 1, 1] : [0, 0, 0, 0],
  );
  const [resultValues, setResultValues] = useState<number[]>([0, 0, 0, 0]);

  function handleCellClick(
    e: React.MouseEvent<HTMLSpanElement>,
    direction = 'forwards',
  ) {
    const cellIndex = Number(e.currentTarget.getAttribute('data-cell'));
    const newCellValues = Array.from(rowValues);

    console.log(rowValues[cellIndex] + 1);

    if (direction === 'forwards') {
      newCellValues[cellIndex] =
        rowValues[cellIndex] < 6 ? rowValues[cellIndex] + 1 : 1;
    } else {
      newCellValues[cellIndex] =
        rowValues[cellIndex] > 1 ? rowValues[cellIndex] - 1 : 6;
    }

    setRowValues(newCellValues);
  }

  function handleButtonClick() {
    const results = calculateResults({ guess: rowValues, secret: secretCode });

    setResultValues(results);
  }

  return (
    <div
      key={`row-${rowIndex}`}
      className={classNames(styles['row'], additionalClasses)}
      data-row={`row-${rowIndex}`}
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <Cell
          key={`guess-cell-${rowIndex}-${index}`}
          dataRow={rowIndex}
          dataCell={index}
          dataValue={rowValues[index]}
          additionalClasses={styles[`guess-cell-${index + 1}`]}
          onClickHandler={handleCellClick}
          disable={rowIndex !== activeRow}
        />
      ))}

      <div className={styles['result-wrapper']}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Cell
            key={`result-cell-${rowIndex}-${index}`}
            dataValue={resultValues[index]}
            additionalClasses={classNames(
              styles['result-cell'],
              styles[`result-cell-${index + 1}`],
            )}
          />
        ))}
      </div>

      <button
        className={classNames(styles['button'], {
          [styles['hide']]: rowIndex !== activeRow,
        })}
        onClick={handleButtonClick}
      >
        Go!
      </button>
    </div>
  );
};

export default MastermindRow;
