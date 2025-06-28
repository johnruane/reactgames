import React, { useEffect, useState } from 'react';

import MastermindContext from './context/MastermindContext';

import Board from './components/Board';
import Cell from './components/Cell';
import { Instructions } from './shared/components';

import generateSecretCode from './lib/generateSecretCode';

import './shared/styles/global.css';
import styles from './styles/style.module.css';

const Snake = ({ setRestartGame }: { setRestartGame?: () => void }) => {
  const [gameOver, setGameOver] = useState(false);
  const [hasGameStarted, setHasGameStarted] = useState(false);

  const [secretCode, setSecretCode] = useState([0, 0, 0, 0]);
  const [activeRow, setActiveRow] = useState(0);

  useEffect(() => {
    const secretNumber = generateSecretCode();
    setSecretCode(secretNumber);
  }, []);

  // const keyPress = (event) => {
  //   event.preventDefault();
  //   const key = event.code;

  //   if (Object.values(SNAKE_DIRECTIONS).includes(key)) {
  //     setProposedSnakeDirection(key);
  //   }
  // };

  // /*
  //  * Event listeners for keypress
  //  */
  // useEffect(() => {
  //   window.addEventListener('keydown', keyPress);
  //   return () => {
  //     window.removeEventListener('keydown', keyPress);
  //   };
  // }, []);

  // /*
  //  * Check to see if the snakeHeadPosition is the same as the foodPosition, which indicates
  //  * that the snake has caught the food. This useEffect generates an new random position for
  //  * the next food and updates the boards.
  //  */
  // useEffect(() => {
  //   if (JSON.stringify(snakeHeadPosition) === JSON.stringify(foodBoardPosition)) {
  //     const { row, col } = getRandomEmptyBoardPosition({ board: displayBoard });
  //     const newFoodBoard = create2dArray({
  //       numberOfRows: 15,
  //       numberOfColumns: 15,
  //       fillValue: 0,
  //     });

  //     newFoodBoard[row][col] = FOOD_VALUE;
  //     setFoodBoard(newFoodBoard);
  //     setFoodBoardPosition({ r: row, c: col });
  //     setScore(score + 1);
  //   }
  // }, [displayBoard]);

  // /*
  //  * Interval to speed up gameplay every 30 seconds
  //  */
  // useInterval(() => {
  //   setLevelInterval((prev) => (prev !== null ? prev * 0.9 : prev));
  // }, levelInterval);

  return (
    <>
      <div className="gp-game-wrapper snake-game-wrapper">
        {/* <div className='snake-panel-wrapper'>
          <Panel sections={[{ heading: 'score', value: score }]} />
        </div> */}

        <div className="overlay-wrapper" data-stack="default">
          <MastermindContext.Provider value={secretCode}>
            <Board
              numberOfRows={10}
              additionalBoardClasses="board"
              activeRow={activeRow}
            />
          </MastermindContext.Provider>
          {/* <GameOverlay
            showGameOver={gameOver}
            showGameOverButton={!hasGameStarted}
            // gameOverButtonAction={startGame}
          /> */}
          <div className={styles['answer-row']}>
            {Array.from(secretCode).map((value, index) => {
              return (
                <Cell
                  dataValue={value}
                  key={`result-cell-${index}-${value}`}
                  additionalClasses={styles[`answer-row-cell`]}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="game-instructions">
        <p className="panel-text panel-text-bold">Instructions</p>

        <ul className="panel-text game-list">
          <Instructions />
          {/* {useMatchMedia('DESKTOP') ? (
            <li>Use the ARROW keys to move Left, Right, Up or Down.</li>
          ) : (
            <li>Use the D-PAD to move Left, Right, Up or Down.</li>
          )} */}
        </ul>
      </div>

      <div className="game-controls-wrapper">
        {/* <Controls
          move={setProposedSnakeDirection}
          onStartClickHandler={setRestartGame!}
        /> */}
      </div>
    </>
  );
};

export default Snake;
