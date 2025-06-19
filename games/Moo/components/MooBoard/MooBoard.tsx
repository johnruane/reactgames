import classNames from 'classnames';

import MooRow from '../MooRow';

import './style.css';

const MooBoard = ({
  numberOfRows,
  className,
  activeRow,
}: {
  numberOfRows: number;
  className: string;
  activeRow: number;
}) => {
  return (
    <div className={classNames('moo-board', className)}>
      {Array.from({ length: numberOfRows }).map((_, index) => (
        <MooRow rowIndex={index} activeRow={activeRow} />
      ))}
    </div>
  );
};

export default MooBoard;
