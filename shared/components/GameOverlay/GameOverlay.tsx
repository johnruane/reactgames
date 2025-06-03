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
    <div className='overlay-text-wrapper'>
      {showGameOver && <p className='overlay-text'>Game Over</p>}
      {showGameOverButton && (
        <button className='overlay-button' onClick={gameOverButtonAction}>
          {gameOverButtonText}
        </button>
      )}
    </div>
  );
};

export default GameOverlay;
