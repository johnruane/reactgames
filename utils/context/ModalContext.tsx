import { createContext, useContext } from 'react';

const startButton = () => {
  return <button className='button-reset game-controls-button' aria-label='Start game' />;
};

const quitButton = () => {
  return <button className='button-reset game-controls-button' aria-label='Quit game' />;
};

export const ModalContext = createContext({
  startButton: startButton,
  quitButton: quitButton,
});

export const GameControlContext = createContext<{
  startNewGame?: () => void;
  quitGame?: () => void;
}>({});

export const useGameControlContext = () => useContext(GameControlContext);
