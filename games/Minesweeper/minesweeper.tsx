import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useInterval, useMatchMedia } from './shared/hooks';
import classNames from 'classnames';

import Cell from './components/Cell';
import { Board, Controls, Instructions, Panel } from './shared/components';

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

import './shared/styles/global.css';
import style from './styles/style.module.css';

const GAME_WIN = 'win';
const GAME_LOSE = 'lose';

const Minesweeper = ({ setRestartGame }: { setRestartGame?: () => void }) => {
  const boardRef = useRef<HTMLDivElement>(null);

  const numberOfMines = 10;
  const emptyCellValue = -1;

  const mineBoard = generateMineBoard({
    board: create2dArray({
      numberOfRows: 9,
      numberOfColumns: 9,
      fillValue: emptyCellValue,
    }),
    numberOfMines: numberOfMines,
  });

  const cluesBoardRef = useRef<number[][]>(
    generateCluesBoard({ board: mineBoard, emptyCellValue }),
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

  const gameOverRef = useRef(gameOver);

  const handleCellClick = (e) => {
    if (gameOverRef.current) return;

    const target = e.target;
    const selectedCellValue = target.getAttribute('data-value');
    const selectedCellPos = JSON.parse(target.getAttribute('data-pos'));

    // If cell is a flagged cell stop execution
    if (selectedCellValue === '10') {
      return;
    }

    const cellsToUpdate = depthFirstSearch({
      board: cluesBoardRef.current,
      pos: selectedCellPos,
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
      getCellValue({ board: cluesBoardRef.current, pos: selectedCellPos }) === 9
    ) {
      setGameOver(GAME_LOSE);
      return;
    }
  };

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

      const cellsToUpdate = findAllMinePositions({ board: mineBoard });
      // Reveal the last hidden cell somehow
      setDisplayBoard((prev) => {
        const newBoard = updateDisplayBoard({
          displayBoard: prev,
          gameBoard: mineBoard,
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
   * Interval to move tetrominos every 'speed' milliseconds
   */
  useInterval(() => {
    if (hasGameStarted) {
      setClock((prev) => prev + 1);
    }
  }, 1000);

  return (
    <>
      <div className={style['game-wrapper']}>
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
          <div className="overlay-text-wrapper">
            {gameOver && (
              <>
                <p className="overlay-text">
                  {gameOver === 'win' ? 'You win!' : 'You Lose'}
                </p>
                <button className="overlay-button" onClick={setRestartGame}>
                  Play Again?
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="game-instructions">
        <p className="panel-text panel-text-bold">Instructions</p>

        <ul className="panel-text game-list">
          <Instructions />
          {useMatchMedia('DESKTOP') ? (
            <>
              <li>Use the MOUSE to select a cell.</li>
              <li>LEFT-CLICK to reveal a cell.</li>
              <li>RIGHT-CLICK to mark a cell with a flag.</li>
            </>
          ) : (
            <>
              <li>Use the d-pad to move Left, Right, Up or Down.</li>
              <li>Press A to reveal a cell.</li>
              <li>Press B to mark a cell with a flag.</li>
            </>
          )}
        </ul>
      </div>

      <div className="game-controls-wrapper">
        <Controls move={() => null} onStartClickHandler={setRestartGame!} />
      </div>
    </>
  );
};

export default Minesweeper;
