import { Board, Cell, Panel } from '../../shared/components';

import styles from './style.module.css';

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
            <Board
              board={boardToShow}
              CellComponent={Cell}
              className={styles['next-board']}
              additionalCellClasses={styles['cell']}
            />
          ),
        },
      ]}
    />
  );
}
