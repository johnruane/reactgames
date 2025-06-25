import { useContext, useRef, useState } from 'react';

import MastermindContext from '../../context/MastermindContext';
import MastermindCell from '../MastermindCell';
import classNames from 'classnames';

import styles from './style.module.css';

const MastermindRow = ({ rowIndex, activeRow, additionalClasses }) => {
  const secretCode = useContext(MastermindContext);

  const [rowValues, setRowValues] = useState<number[]>([0, 0, 0, 0]);

  function handleCellClick(e: React.MouseEvent<HTMLSpanElement>) {
    const cellIndex = Number(e.currentTarget.getAttribute('data-cell'));
    const newCellValues = Array.from(rowValues);

    newCellValues[cellIndex] =
      rowValues[cellIndex] < 6 ? rowValues[cellIndex] + 1 : 1;
    setRowValues(newCellValues);
  }

  return (
    <div
      key={`mastermind-row-${rowIndex}`}
      className={styles['mastermind-row']}
      data-row={`mastermind-row-${rowIndex}`}
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <MastermindCell
          key={`guess-cell-${rowIndex}-${index}`}
          dataRow={rowIndex}
          dataCell={index}
          dataValue={rowValues[index]}
          additionalClasses={styles[`guess-cell-${index + 1}`]}
          onClickHandler={handleCellClick}
          disable={rowIndex !== activeRow}
        />
      ))}

      {Array.from({ length: 4 }).map((_, index) => (
        <MastermindCell
          key={`result-cell-${rowIndex}-${index}`}
          additionalClasses={styles[`result-cell-${index + 1}`]}
        />
      ))}

      <button
        className={classNames(styles['mastermind-go-button'], {
          [styles['hide']]: rowIndex !== activeRow,
        })}
      >
        Go!
      </button>
    </div>
  );
};

export default MastermindRow;
