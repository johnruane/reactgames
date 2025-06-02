import './style.css';

export default function Controls({
  move,
  onStartClickHandler,
  onQuitClickHandler,
}: Readonly<{
  move: (unknown: string) => void;
  onStartClickHandler: () => void;
  onQuitClickHandler: () => void;
}>) {
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
              onClick={onStartClickHandler}
              aria-label='Start game'
            />
          </span>
          <span className='game-controls-button-text-wrapper'>
            <p className='game-controls-button-text'>SELECT</p>
            <button
              className='button-reset game-controls-button'
              onClick={onQuitClickHandler}
              aria-label='Open games menu'
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
