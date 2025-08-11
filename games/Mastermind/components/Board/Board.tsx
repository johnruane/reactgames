import Row from '../Row';
import classNames from 'classnames';

import styles from './style.module.css';

const Board = ({
  numberOfRows,
  additionalBoardClasses,
  activeRow,
  setActiveRow,
}: {
  numberOfRows: number;
  additionalBoardClasses?: string;
  activeRow: number;
  setActiveRow: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className={classNames(styles['board'], additionalBoardClasses)}>
      {Array.from({ length: numberOfRows }).map((_, index) => (
        <Row
          rowIndex={index}
          activeRow={activeRow}
          setActiveRow={setActiveRow}
        />
      ))}
    </div>
  );
};

export default Board;
