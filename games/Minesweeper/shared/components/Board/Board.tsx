import { forwardRef } from 'react';

import { Cell } from '..';
import classNames from 'classnames';

import './style.css';

const Board = forwardRef<
  HTMLDivElement,
  {
    board: number[][];
    CellComponent?: React.ComponentType<{
      id?: string;
      value: number;
      pos: string;
      onClickCellCallback?: (pos: string) => void;
    }>;
    className?: string;
    onClickCellCallback?: (pos: string) => void;
  }
>(({ board, CellComponent = Cell, className, onClickCellCallback }, ref) => {
  return (
    <div ref={ref} className={classNames('board', className)}>
      {board?.map((boardRow, i) => (
        <div key={`r-${i}`} className="board-row" data-animate="row">
          {boardRow.map((cell, j) => (
            <CellComponent
              key={`c-${i}-${j}`}
              value={cell}
              pos={`{"r":${i},"c":${j}}`}
              onClickCellCallback={onClickCellCallback}
            />
          ))}
        </div>
      ))}
    </div>
  );
});

export default Board;
