/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from 'react';

import useEventBus from './hooks/useEventBus';
import { useInterval } from './shared/hooks';
import { cloneDeep } from 'lodash-es';

import Next from './components/Next';
import { Board, GameOverlay, Panel } from './shared/components';

import { create2dArray } from './shared/utils';

import {
  addTetrominoToBoard,
  animateCompleteRow,
  canTetrominoMoveToPosition,
  convertScore,
  findCompletedRows,
  getRandomTetromino,
  removeRowsFromBoard,
  rotateMatrix,
} from './lib';

import './shared/styles/global.css';
import './styles/style.css';

/*
 * @position: Current r & c position to place the top left corner of the tetromino on a board.
 * @displayBoard: The board rendered in the browser.
 * @staticBoard: We have a static board which does not contain the current moving piece. When a
 * move is made we check if the @currentTetromino can be placed on the @staticBoard at @position.
 * If we only had one board we'd have to keep removing the @currentTetromino on the next move.
 *
 * @currentTetromino: The current in play tetromino matrix and value.
 * @nextTetromino: The next tetromino matrix and value.
 *
 * @score: Score in the game. Multiplier is added when completing more than one row.
 * @lines: Number of completed rows achieved.
 * @level: Level in the game. Level is increased every @levelInterval milliseconds.
 *
 * @levelInterval: Milliseconds the speed of the game is increased at.
 * @speed: Milliseconds at which the game runs and the tetromino is moved downwards. This is reduced
 * over time which increases the speed the tetrominos fall at.
 *
 * @gameStatus: String for 'Game Over' message
 */

const boardConfig = {
  numberOfRows: 19,
  numberOfColumns: 10,
  fillValue: 0,
};

const Tetris = () => {
  const [position, setPosition] = useState({ r: 0, c: 4 });

  const [displayBoard, setDisplayBoard] = useState(create2dArray(boardConfig));
  const [staticBoard, setStaticBoard] = useState(create2dArray(boardConfig));

  const [currentTetromino, setCurrentTetromino] = useState<{
    value: number;
    matrix: number[][];
  } | null>(null);
  const [nextTetromino, setNextTetromino] = useState<{
    value: number;
    matrix: number[][];
  } | null>(null);

  const [score, setScore] = useState('000000');
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(0);

  const [speed, setSpeed] = useState<number | null>(null);
  const [levelInterval, setLevelInterval] = useState<number | null>(null);

  const [gameOver, setGameOver] = useState(false);
  const [hasGameStarted, setHasGameStarted] = useState(false);

  const previousSpeedRef = useRef<number | null>(null);
  const previousLevelIntervalRef = useRef<number | null>(null);
  const nextTetrominolRef = useRef<{
    value: number;
    matrix: number[][];
  } | null>(null);

  const startGame = () => {
    setDisplayBoard(create2dArray(boardConfig));
    setStaticBoard(create2dArray(boardConfig));
    setCurrentTetromino(getRandomTetromino());
    setNextTetromino(getRandomTetromino());

    setScore('000000');
    setLines(0);
    setLevel(0);

    setSpeed(1000);
    setLevelInterval(30000);

    setGameOver(false);
    setHasGameStarted(true);
  };

  /*
   * Setting these two intervals to 'null' stops the useInterval hook from executing and effectively
   * pauses the game.
   */
  const pauseGameplay = () => {
    setSpeed(null);
    setLevelInterval(null);
  };

  /*
   * As pausing and resuming may occur in a callback, state may be stale. Using useRef ensures stale state
   * is not a problem.
   */
  const restoreGameplay = useCallback(() => {
    setSpeed(previousSpeedRef.current);
    setLevelInterval(previousLevelIntervalRef.current);
    setNextTetromino(nextTetrominolRef.current);
  }, [previousSpeedRef, previousLevelIntervalRef]);

  /*
   * Function to reset position and cycle tetrominos. Done as a function in order to control when this
   * occurs in the execution cycle e.g. like when there is a need to wait for an animation to complete.
   */
  const makeNextPlay = () => {
    if (!hasGameStarted) return;

    setPosition({ r: 0, c: 4 });
    setCurrentTetromino(nextTetromino);
    setNextTetromino(getRandomTetromino());
  };

  /*
   * Update the 'position' either via 'useInterval', in which case 'direction' is 'undefined' or
   * via 'keyPress'.
   */
  const moveTetrominoInDirection = (direction) => {
    let newR = position.r;
    let newC = position.c;

    switch (direction) {
      case 'ArrowLeft':
        newC = position.c - 1;
        break;
      case 'ArrowRight':
        newC = position.c + 1;
        break;
      case 'ArrowDown':
      default:
        newR = position.r + 1;
        break;
    }

    const canMove = canTetrominoMoveToPosition(
      {
        r: newR,
        c: newC,
      },
      currentTetromino?.matrix,
      staticBoard,
    );

    if (canMove) {
      setPosition({
        r: newR,
        c: newC,
      });
    }

    /*
     * If canMove === false AND direction === 'ArrowDown' the piece can no longer move down
     * so set 'staticBoard' to complete the current play.
     */
    if (!canMove && direction === 'ArrowDown') {
      setStaticBoard(
        addTetrominoToBoard(
          cloneDeep(staticBoard),
          currentTetromino?.matrix,
          position.r,
          position.c,
        ),
      );
    }
  };

  /*
   * Keypress events. Either the piece is attempted to move in desired direction, or 'currentTetromino'
   * is rotated.
   */
  const keyPress = (event) => {
    event.preventDefault();
    const key = event.code;
    move(key);
  };

  const move = (key) => {
    if (['ArrowRight', 'ArrowLeft', 'ArrowDown'].includes(key)) {
      moveTetrominoInDirection(key);
    }

    if (key === 'Space' && currentTetromino !== null) {
      const rotatedMatrix = rotateMatrix({ tetromino: currentTetromino });
      const canMove = canTetrominoMoveToPosition(
        {
          r: position.r,
          c: position.c,
        },
        rotatedMatrix,
        staticBoard,
      );

      if (canMove) {
        setCurrentTetromino({
          matrix: rotatedMatrix,
          value: currentTetromino.value,
        });
      }
    }
  };

  /*
   * When staticBoard is updated, that signals that a play has ended so we need to check for completed
   * rows on the board. Completed rows are returned in an array of indexes. Indexed rows are removed from
   * a clone of the static board. The updated board is passed as an argument to the animateWinningRows
   * function to be executed as a 'onFinish' function if the index is the last row to be animated.
   */
  useEffect(() => {
    const cloneBoard = cloneDeep(staticBoard);

    /*
     * We sort the indexes ascending so that rows are removed from top to bottom. If descending then the board
     * indexes would be wrong as we shift the rows downwards after removing a row.
     */
    const indexesOfCompleteRows = findCompletedRows({ board: cloneBoard }).sort(
      (a, b) => a - b,
    );
    const updatedBoard = removeRowsFromBoard(cloneBoard, indexesOfCompleteRows);

    // Callback function to be executed after the last animation has completed.
    const updateStaticBoardCallback = () => {
      setStaticBoard(updatedBoard);
      makeNextPlay();
      restoreGameplay();
    };

    /*
     * Animate each complete row or start next playing piece.
     */
    if (indexesOfCompleteRows.length > 0) {
      // Preserve these values as they need to be restored afterwards
      previousSpeedRef.current = speed;
      previousLevelIntervalRef.current = levelInterval;
      nextTetrominolRef.current = nextTetromino;

      pauseGameplay(); // We do this so the animation can run

      indexesOfCompleteRows.forEach((element, index) => {
        animateCompleteRow(
          element,
          index === indexesOfCompleteRows.length - 1,
          updateStaticBoardCallback,
        );
        setLines((current) => current + 1);
      });

      setScore(convertScore(score, indexesOfCompleteRows.length));
    } else {
      makeNextPlay();
    }
  }, [staticBoard]);

  /*
   * If tetromino cannot be placed at position {0, 4} that means the pieces have reached
   * the top and it is game over.
   */
  useEffect(() => {
    const canMove = canTetrominoMoveToPosition(
      {
        r: 0,
        c: 4,
      },
      currentTetromino?.matrix,
      staticBoard,
    );

    // End current game.
    if (!canMove) {
      pauseGameplay();
      setGameOver(true);
      setHasGameStarted(false);
    }
  }, [position]);

  /*
   * Updates 'displayBoard' every time the position or 'currentTertromino' changes. The position is updated
   * every interval & the 'currentTetromino' is updated either via 'rotate' or when the 'nextTetromino'
   * is put into play.
   */
  useEffect(() => {
    setDisplayBoard(
      addTetrominoToBoard(
        cloneDeep(staticBoard),
        currentTetromino?.matrix,
        position.r,
        position.c,
      ),
    );
  }, [position, currentTetromino]);

  /*
   * Event listeners for keypress
   */
  useEffect(() => {
    window.addEventListener('keydown', keyPress);
    return () => {
      window.removeEventListener('keydown', keyPress);
    };
  }, [keyPress]);

  /*
   * Interval to move tetrominos every 'speed' milliseconds
   */
  useInterval(() => {
    moveTetrominoInDirection('ArrowDown');
  }, speed);

  /*
   * Interval to increase game speed every 30 seconds by 10%. Each increase denotes the
   * next level of the game.
   */
  useInterval(() => {
    setSpeed((prev) => (prev !== null ? Math.round(prev * 0.9) : prev));
    setLevel((prev) => prev + 1);
  }, levelInterval);

  /*
   * Event bus setup for control clicks
   */
  useEventBus(move);

  return (
    <>
      <div className={'tetris tetris-game-wrapper'}>
        <div className="game-side-details">
          <div className="panel-wrapper">
            <Panel
              sections={[
                { heading: 'score', value: score },
                { heading: 'level', value: level },
                { heading: 'lines', value: lines },
              ]}
            />
          </div>
        </div>

        <div className="overlay-wrapper">
          <Board board={displayBoard} additionalBoardClasses="tetris" />
          <GameOverlay
            showGameOver={gameOver}
            showGameOverButton={!hasGameStarted}
            gameOverButtonAction={startGame}
          />
        </div>

        <div className="tetris-score-wrapper" data-stack="space-xs">
          <div className="next-wrapper">
            <Next nextTetromino={nextTetromino?.matrix} show={hasGameStarted} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Tetris;
