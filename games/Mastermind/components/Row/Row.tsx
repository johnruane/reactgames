import { useContext, useEffect, useState } from 'react';

import MastermindContext from '../../context/MastermindContext';
import Cell from '../Cell';
import Result from '../Result/Result';
import classNames from 'classnames';

import calculateResults from '../../lib/calculateResults';

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
  const { secretCode, setWin, setHasGameStarted } =
    useContext(MastermindContext)!;

  const [rowValues, setRowValues] = useState<number[]>(
    activeRow === rowIndex ? [1, 1, 1, 1] : [0, 0, 0, 0],
  );
  const [resultValues, setResultValues] = useState<number[]>([0, 0, 0, 0]);
  const [showResult, setShowResults] = useState(false);

  function handleCellClick(e: React.MouseEvent<HTMLSpanElement>) {
    const cellParent = Number(e.currentTarget.getAttribute('data-cell-parent'));
    const cellValue = Number(e.currentTarget.getAttribute('data-value'));
    const newCellValues = Array.from(rowValues);

    newCellValues[cellParent] = cellValue;
    setRowValues(newCellValues);
  }

  function handleButtonClick() {
    setHasGameStarted(true);

    const results = calculateResults({ guess: rowValues, secret: secretCode });
    setResultValues(results);
    setShowResults(true);

    // Check for win condition: [10, 10, 10, 10] means all 4 exact matches
    if (results.length === 4 && results.every((result) => result === 10)) {
      setWin(true);
    }

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
      {Array.from({ length: 4 }).map((_, index) => (
        <>
          <Cell
            key={`guess-cell-${rowIndex}-${index}`}
            dataRow={rowIndex}
            dataCell={index}
            dataValue={rowValues[index]}
            onClickHandler={handleCellClick}
            disable={rowIndex !== activeRow}
          />
        </>
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
          Go!
        </button>
      )}
    </div>
  );
};

export default MastermindRow;
