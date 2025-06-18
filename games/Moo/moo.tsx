import React, { useState } from 'react';

import { Instructions } from './shared/components';
import MooBoard from './components/MooBoard';

import './shared/styles/global.css';
import './styles/style.css';

const Snake = ({ setRestartGame }: { setRestartGame?: () => void }) => {
  const [gameOver, setGameOver] = useState(false);
  const [hasGameStarted, setHasGameStarted] = useState(false);

  const [activeRow, setActiveRow] = useState(0);

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
      <div className='gp-game-wrapper snake-game-wrapper'>
        {/* <div className='snake-panel-wrapper'>
          <Panel sections={[{ heading: 'score', value: score }]} />
        </div> */}

        <div className='overlay-wrapper'>
          <MooBoard numberOfRows={10} className='moo-board' activeRow={activeRow} />
          {/* <GameOverlay
            showGameOver={gameOver}
            showGameOverButton={!hasGameStarted}
            // gameOverButtonAction={startGame}
          /> */}
        </div>
      </div>

      <div className='game-instructions'>
        <p className='panel-text panel-text-bold'>Instructions</p>

        <ul className='panel-text game-list'>
          <Instructions />
          {/* {useMatchMedia('DESKTOP') ? (
            <li>Use the ARROW keys to move Left, Right, Up or Down.</li>
          ) : (
            <li>Use the D-PAD to move Left, Right, Up or Down.</li>
          )} */}
        </ul>
      </div>

      <div className='game-controls-wrapper'>
        {/* <Controls
          move={setProposedSnakeDirection}
          onStartClickHandler={setRestartGame!}
        /> */}
      </div>
    </>
  );
};

export default Snake;
