import './style.css';

export default function Controls({
  onStartClickHandler,
  onQuitClickHandler,
}: {
  onStartClickHandler: () => void;
  onQuitClickHandler: () => void;
}) {
  return (
    <>
      <span className="game-controls-button-text-wrapper">
        <p className="game-controls-button-text">START</p>
        <button
          className="button-reset game-controls-button"
          onClick={onStartClickHandler}
          aria-label="Start game"
        />
      </span>
      <span className="game-controls-button-text-wrapper">
        <p className="game-controls-button-text">QUIT</p>
        <button
          className="button-reset game-controls-button"
          onClick={onQuitClickHandler}
          aria-label="Quit game"
        />
      </span>
    </>
  );
}
