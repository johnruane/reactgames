import { useContext, useState } from 'react';

import MastermindContext from '../../context/MastermindContext';
import MastermindCell from '../Cell';
import classNames from 'classnames';

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

  const [rowValues, setRowValues] = useState<number[]>([0, 0, 0, 0]);

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
    let resultStr = '';
    rowValues.forEach((index, value) => {
      if (secretCode[`${index}`] === value) {
        resultStr += 'Y';
      } else {
        resultStr += 'N';
      }
    });
    console.log(resultStr);
  }

  return (
    <div
      key={`row-${rowIndex}`}
      className={(styles['row'], additionalClasses)}
      data-row={`row-${rowIndex}`}
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
