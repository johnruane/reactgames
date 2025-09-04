import { useEffect, useRef, useState } from 'react';

import useEventBus from './hooks/useEventBus';
import { useInterval } from './shared/hooks';
import classNames from 'classnames';

import { GameOverlay } from '../Mastermind/shared/components';
import Cell from './components/Cell';
import { Board, Panel } from './shared/components';

import { create2dArray } from './shared/utils';

import {
  depthFirstSearch,
  findAllMinePositions,
  generateCluesBoard,
  generateMineBoard,
  getCellValue,
  isBoardDefaultState,
  removeObjectFromArray,
  updateDisplayBoard,
} from './lib';
import { getCellElement } from './lib/getCellElement';

import './shared/styles/global.css';
import style from './styles/style.module.css';

const GAME_WIN = 'win';
const GAME_LOSE = 'lose';

const Minesweeper = ({
  restartClickHandler,
}: {
  restartClickHandler?: () => void;
}) => {
  const boardRef = useRef<HTMLDivElement>(null);

  const numberOfMines = 10;
  const emptyCellValue = -1;

  const mineBoardRef = useRef(
    generateMineBoard({
      board: create2dArray({
        numberOfRows: 9,
        numberOfColumns: 9,
        fillValue: emptyCellValue,
      }),
      numberOfMines: numberOfMines,
    }),
  );

  const cluesBoardRef = useRef<number[][]>(
    generateCluesBoard({ board: mineBoardRef.current, emptyCellValue }),
  );

  const [displayBoard, setDisplayBoard] = useState(
    create2dArray({
      numberOfRows: 9,
      numberOfColumns: 9,
      fillValue: emptyCellValue,
    }),
  );

  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [clock, setClock] = useState(0);
  const [gameOver, setGameOver] = useState('');
  const [flagsMarked, setFlagsMarked] = useState<CellPosition[]>([]);
  const [selectedCellPos, setSelectedCellPos] = useState<string>('');

  const gameOverRef = useRef(gameOver);

  const handleCellClick = (e) => {
    if (gameOverRef.current) return;

    const target = e.target;
    const selectedCellValue = target.getAttribute('data-value');

    const selectedCellPos = target.getAttribute('data-pos');
    setSelectedCellPos(target.getAttribute('data-pos')); // Store cell position for highlighting

    // If cell is a flagged cell stop execution
    if (selectedCellValue === '10') {
      return;
    }

    const cellsToUpdate = depthFirstSearch({
      board: cluesBoardRef.current,
      pos: JSON.parse(selectedCellPos),
    });

    setDisplayBoard((prev) => {
      const newBoard = updateDisplayBoard({
        displayBoard: prev,
        gameBoard: cluesBoardRef.current,
        cellsToUpdate: cellsToUpdate,
      });
      return newBoard;
    });

    // If cell is 9 (a mine) set 'game over'
    if (
      getCellValue({
        board: cluesBoardRef.current,
        pos: JSON.parse(selectedCellPos),
      }) === 9
    ) {
      setGameOver(GAME_LOSE);
      return;
    }
  };

  const directionMove = (key) => {
    const { r, c } = JSON.parse(selectedCellPos) || {};

    switch (key) {
      case 'ArrowUp':
        if (r !== 0) setSelectedCellPos(`{"r": ${r - 1}, "c": ${c}}`);
        break;
      case 'ArrowDown':
        if (r !== 8) setSelectedCellPos(`{"r": ${r + 1}, "c": ${c}}`);
        break;
      case 'ArrowLeft':
        if (c !== 0) setSelectedCellPos(`{"r": ${r}, "c": ${c - 1}}`);
        break;
      case 'ArrowRight':
        if (c !== 8) setSelectedCellPos(`{"r": ${r}, "c": ${c + 1}}`);
        break;
    }
  };

  const actionButton = (key) => {
    const cellElement = getCellElement({
      cellPos: selectedCellPos,
      boardRef,
    });

    switch (key) {
      case 'ActionA':
        (cellElement as HTMLElement).click();
        break;
      case 'ActionB':
        (cellElement as HTMLElement).dispatchEvent(
          new MouseEvent('contextmenu', {
            bubbles: true,
            cancelable: true,
            button: 2,
          }),
        );
        break;
    }
  };

  const move = (key) => {
    if (['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(key)) {
      directionMove(key);
    }
    if (['ActionA', 'ActionB'].includes(key)) {
      actionButton(key);
    }
  };

  useEventBus(move);

  useEffect(() => {
    gameOverRef.current = gameOver;
  }, [gameOver]);

  /*
   * This useEffect resets any flagged cell that have been revealed during a 'flood-fill'.
   */
  useEffect(() => {
    for (const pos of flagsMarked) {
      const { r, c } = pos || {};
      if (displayBoard[r][c] !== -1) {
        setFlagsMarked((prev) => {
          const newFlagged = removeObjectFromArray({
            array: [...prev],
            obj: pos,
          });
          return newFlagged;
        });
      }
    }
  }, [displayBoard, flagsMarked]);

  /*
   * hasGameStarted state controls the clock timer. If the displayBoard cells are all -1 then
   * the game has not begun.
   */
  useEffect(() => {
    const isBoardDefault = isBoardDefaultState({ board: displayBoard });
    if (!isBoardDefault) {
      setHasGameStarted(true);
    }
  }, [displayBoard]);

  useEffect(() => {
    let cellUncovered = 0;
    displayBoard.forEach((row) => {
      row.forEach((cell) => {
        if (cell === -1) {
          cellUncovered += 1;
        }
      });
    });

    // If there are the same number of cells hidden as mines layed, the game is won
    if (cellUncovered === numberOfMines) {
      setGameOver(GAME_WIN);
    }
  }, [displayBoard]);

  useEffect(() => {
    // Used to start the clock timer
    if (gameOver !== '') {
      setHasGameStarted(false);

      const cellsToUpdate = findAllMinePositions({
        board: mineBoardRef.current,
      });

      // Reveal the last hidden cell somehow
      setDisplayBoard((prev) => {
        const newBoard = updateDisplayBoard({
          displayBoard: prev,
          gameBoard: mineBoardRef.current,
          cellsToUpdate: cellsToUpdate,
        });
        return newBoard;
      });
    }
  }, [gameOver]);

  /*
   * This useEffect runs on right mouse click. oncontextmenu preventDefault prevents the
   * default context menu from opening. From here we are checking whether to set a flag on a
   * cell, or remove a flag.
   */
  useEffect(() => {
    if (boardRef.current) {
      boardRef.current.oncontextmenu = (e: MouseEvent) => {
        e.preventDefault();

        if (gameOver !== '') return;

        const target = e.target as HTMLElement;
        const targetDataValue = target?.getAttribute('data-value');
        const targetDataPos = target?.getAttribute('data-pos');
        const targetCellPos = targetDataPos ? JSON.parse(targetDataPos) : null;

        // Flag cell
        if (
          numberOfMines - flagsMarked.length !== 0 &&
          targetDataValue === '-1'
        ) {
          target.setAttribute('data-value', '10');
          setFlagsMarked((prev) => [...prev, targetCellPos]);
        }

        // Un-flag cell
        if (targetDataValue === '10') {
          target.setAttribute('data-value', '-1');

          setFlagsMarked((prev) => {
            const newFlagged = removeObjectFromArray({
              array: [...prev],
              obj: targetCellPos,
            });
            return newFlagged;
          });
        }
      };
    }
  }, [flagsMarked]);

  /*
   * This useEffect uses the boardRef and a local state 'selectedCellPos' to add
   * an outline to the currently selected cell.
   */
  useEffect(() => {
    if (!selectedCellPos) return;

    const allCells = boardRef.current?.querySelectorAll('.board-cell');
    allCells?.forEach((cell) => cell.classList.remove(style['selected']));

    const cellElement = getCellElement({ cellPos: selectedCellPos, boardRef });
    (cellElement as Element).classList.add(style['selected']);
  }, [selectedCellPos]);

  /*
   * Interval to update clock every 1000 milliseconds.
   */
  useInterval(() => {
    if (hasGameStarted && gameOver === '') {
      setClock((prev) => prev + 1);
    }
  }, 1000);

  return (
    <>
      <div
        className={classNames(style['minesweeper-game-wrapper'], {
          ['game-wrapper-overlay']: gameOver,
        })}
      >
        <div className={style['panel-wrapper']}>
          <Panel
            sections={[
              { heading: 'clock', value: clock },
              { heading: 'flags', value: numberOfMines - flagsMarked.length },
            ]}
          />
          <span className={style['emoji']}>{gameOver ? '😵' : '😀'}</span>
        </div>

        <div className="overlay-wrapper">
          <Board
            ref={boardRef}
            board={displayBoard}
            CellComponent={Cell}
            onClickCellCallback={handleCellClick}
          />

          <GameOverlay
            showGameOver={gameOver !== ''}
            showGameOverButton={gameOver !== ''}
            gameOverText={gameOver === 'win' ? 'You win!' : 'You Lose'}
            gameOverButtonAction={restartClickHandler!}
          />
        </div>
      </div>
    </>
  );
};

export default Minesweeper;
