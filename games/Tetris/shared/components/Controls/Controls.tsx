import { useContext } from 'react';
import { GameControlContext } from '@context/ModalContext';

import './style.css';

export default function Controls({
  move,
  onStartClickHandler,
  onQuitClickHandler,
}: {
  move: (unknown: string) => void;
  onStartClickHandler: () => void;
  onQuitClickHandler: () => void;
}) {
  const { startNewGame, quitGame } = useContext(GameControlContext);

  return (
    <div className='game-controls'>
      <div className='game-controls-elements-wrapper'>
        <div className='game-controls-d-pad'>
          <button
            className='button-reset pad-left'
            onClick={() => move('ArrowLeft')}
            aria-label='Move left'
          />
          <button
            className='button-reset pad-down'
            onClick={() => move('ArrowDown')}
            aria-label='Move down'
          />
          <button
            className='button-reset pad-up'
            onClick={() => move('ArrowUp')}
            aria-label='Move up'
          />
          <button
            className='button-reset pad-right'
            onClick={() => move('ArrowRight')}
            aria-label='Move right'
          />

          <div className='game-controls-d-pad-spacer'></div>
        </div>
        <div className='game-function-buttons-wrapper'>
          <span className='game-controls-button-text-wrapper'>
            <p className='game-controls-button-text'>START</p>
            <button
              className='button-reset game-controls-button'
              onClick={startNewGame}
              aria-label='Start game'
            />
          </span>
          <span className='game-controls-button-text-wrapper'>
            <p className='game-controls-button-text'>QUIT</p>
            <button
              className='button-reset game-controls-button'
              onClick={quitGame}
              aria-label='Quit game'
            />
          </span>
        </div>
        <div className='control-buttons'>
          <button
            className='button-reset button-a'
            onClick={() => move('Space')}
            aria-label='A button'
          />
          <button className='button-reset button-b' aria-label='B button' />
        </div>
      </div>
    </div>
  );
}
