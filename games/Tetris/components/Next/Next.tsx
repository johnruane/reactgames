import { Board, Cell, Panel } from '../../shared/components';

import './style.css';

const emptyBoard = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

export default function Next({ nextTetromino, show }) {
  const boardToShow = show ? nextTetromino : emptyBoard;

  return (
    <Panel
      sections={[
        {
          heading: 'Next',
          value: (
            <Board board={boardToShow} CellComponent={Cell} className='next-board' />
          ),
        },
      ]}
    />
  );
}
