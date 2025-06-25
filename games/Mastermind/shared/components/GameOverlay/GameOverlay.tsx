import style from './style.module.css';

const GameOverlay = ({
  showGameOver,
  showGameOverButton,
  gameOverButtonText = showGameOver ? 'Play Again' : 'Play Game',
  gameOverButtonAction,
}: {
  showGameOver: boolean;
  showGameOverButton: boolean;
  gameOverButtonText?: string;
  gameOverButtonAction: () => void;
}) => {
  return (
    <div className={style['text-wrapper']}>
      {showGameOver && <p className={style['text']}>Game Over</p>}
      {showGameOverButton && (
        <button className={style['button']} onClick={gameOverButtonAction}>
          {gameOverButtonText}
        </button>
      )}
    </div>
  );
};

export default GameOverlay;
