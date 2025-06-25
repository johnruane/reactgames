import classNames from 'classnames';

import MastermindRow from '../MastermindRow';

import styles from './style.module.css';

const MastermindBoard = ({
  numberOfRows,
  className,
  activeRow,
}: {
  numberOfRows: number;
  className: string;
  activeRow: number;
}) => {
  return (
    <div className={classNames(styles['mastermind-board'], className)}>
      {Array.from({ length: numberOfRows }).map((_, index) => (
        <MastermindRow rowIndex={index} activeRow={activeRow} />
      ))}
    </div>
  );
};

export default MastermindBoard;
