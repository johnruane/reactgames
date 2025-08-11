import { forwardRef } from 'react';

import { Cell } from '..';
import classNames from 'classnames';

import style from './style.module.css';

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
    additionalBoardClasses?: string;
    additionalCellClasses?: string;
    onClickCellCallback?: (pos: string) => void;
  }
>(
  (
    {
      board,
      CellComponent = Cell,
      additionalBoardClasses,
      additionalCellClasses,
      onClickCellCallback,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={classNames(style['board'], additionalBoardClasses)}
      >
        {board?.map((boardRow, i) => (
          <div key={`r-${i}`} className={style['board-row']} data-animate="row">
            {boardRow.map((cell, j) => (
              <CellComponent
                key={`c-${i}-${j}`}
                value={cell}
                pos={`{"r":${i},"c":${j}}`}
                additionalClasses={additionalCellClasses}
                onClickCellCallback={onClickCellCallback}
              />
            ))}
          </div>
        ))}
      </div>
    );
  },
);

export default Board;
