import Row from '../Row';
import classNames from 'classnames';

import styles from './style.module.css';

const Board = ({
  numberOfRows,
  additionalBoardClasses,
  activeRow,
}: {
  numberOfRows: number;
  additionalBoardClasses?: string;
  activeRow: number;
}) => {
  return (
    <div className={classNames(styles['board'], additionalBoardClasses)}>
      {Array.from({ length: numberOfRows }).map((_, index) => (
        <Row rowIndex={index} activeRow={activeRow} />
      ))}
    </div>
  );
};

export default Board;
