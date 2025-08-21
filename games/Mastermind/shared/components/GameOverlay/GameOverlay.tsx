import style from './style.module.css';

const GameOverlay = ({
  showGameOver,
  showGameOverButton,
  gameOverText = 'Game Over',
  gameOverButtonText = showGameOver ? 'Play Again' : 'Play Game',
  gameOverButtonAction,
}: {
  showGameOver: boolean;
  showGameOverButton: boolean;
  gameOverText?: string;
  gameOverButtonText?: string;
  gameOverButtonAction: () => void;
}) => {
  return (
    <div className={style['text-wrapper']}>
      {showGameOver && <p className={style['text']}>{gameOverText}</p>}
      {showGameOverButton && (
        <button className={style['button']} onClick={gameOverButtonAction}>
          {gameOverButtonText}
        </button>
      )}
    </div>
  );
};

export default GameOverlay;
