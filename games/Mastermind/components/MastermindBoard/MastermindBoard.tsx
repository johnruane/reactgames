import classNames from 'classnames';

import MastermindRow from '../MastermindRow';

import './style.css';

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
    <div className={classNames('mastermind-board', className)}>
      {Array.from({ length: numberOfRows }).map((_, index) => (
        <MastermindRow rowIndex={index} activeRow={activeRow} />
      ))}
    </div>
  );
};

export default MastermindBoard;
