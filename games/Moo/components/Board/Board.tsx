import classNames from 'classnames';

import MooCell from '../MooCell';
import { Cell } from '../../shared/components';

import './style.css';

const Board = ({
  numberOfRows,
  className,
}: {
  numberOfRows: number;
  className: string;
}) => {
  return (
    <div className={classNames('moo-board', className)}>
      {Array.from({ length: numberOfRows }).map((_, index) => (
        <div key={`moo-row-${index}`} className='moo-row'>
          {Array.from({ length: 4 }).map((_, index) => (
            <MooCell
              index={index}
              key={`guess-cell-${index}`}
              additionalClasses={`guess-cell-${index + 1}`}
            />
          ))}

          {Array.from({ length: 4 }).map((_, index) => (
            <Cell
              key={`result-cell-${index}`}
              additionalClasses={`result-cell-${index + 1}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
