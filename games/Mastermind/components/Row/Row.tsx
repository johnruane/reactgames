import { useContext, useEffect, useState } from 'react';

import MastermindContext from '../../context/MastermindContext';
import Cell from '../Cell';
import Result from '../Result/Result';
import classNames from 'classnames';

import calculateResults from '../../lib/calculateResults';

import CircleFilled from '@svg/global/circle-filled.svg?react';

import styles from './style.module.css';

const MastermindRow = ({
  rowIndex,
  activeRow,
  setActiveRow,
  additionalClasses,
}: {
  rowIndex: number;
  activeRow: number;
  setActiveRow: React.Dispatch<React.SetStateAction<number>>;
  additionalClasses?: string;
}) => {
  const secretCode = useContext(MastermindContext)!;

  const [rowValues, setRowValues] = useState<number[]>(
    activeRow === rowIndex ? [1, 1, 1, 1] : [0, 0, 0, 0],
  );
  const [resultValues, setResultValues] = useState<number[]>([0, 0, 0, 0]);
  const [showResult, setShowResults] = useState(false);

  function handleCellClick(
    e: React.MouseEvent<HTMLSpanElement>,
    direction = 'forwards',
  ) {
    const cellIndex = Number(e.currentTarget.getAttribute('data-cell'));
    const newCellValues = Array.from(rowValues);

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
    setShowResults(true);
    setActiveRow((prev) => prev + 1);
  }

  useEffect(() => {
    if (rowIndex === activeRow) setRowValues([1, 1, 1, 1]);
  }, [activeRow]);

  return (
    <div
      key={`row-${rowIndex}`}
      className={classNames(styles['row'], additionalClasses)}
      data-row={`row-${rowIndex}`}
    >
      <div className={styles['arrow']}>
        <CircleFilled
          className={classNames({ [styles['hide']]: rowIndex !== activeRow })}
        />
      </div>

      {Array.from({ length: 4 }).map((_, index) => (
        <Cell
          key={`guess-cell-${rowIndex}-${index}`}
          dataRow={rowIndex}
          dataCell={index}
          dataValue={rowValues[index]}
          onClickHandler={handleCellClick}
          disable={rowIndex !== activeRow}
        />
      ))}

      {showResult && <Result rowIndex={rowIndex} resultValues={resultValues} />}
      {!showResult && rowIndex !== activeRow && (
        <div className={styles['empty-result']}></div>
      )}
      {!showResult && rowIndex === activeRow && (
        <button
          className={classNames(styles['button'], {
            [styles['hide']]: rowIndex !== activeRow,
          })}
          onClick={handleButtonClick}
        >
          GO!
        </button>
      )}
    </div>
  );
};

export default MastermindRow;
