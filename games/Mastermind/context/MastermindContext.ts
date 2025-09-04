import { createContext } from 'react';

type MastermindContextType = {
  secretCode: number[];
  setWin: React.Dispatch<React.SetStateAction<boolean>>;
  setHasGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultValues: MastermindContextType = {
  secretCode: [],
  setWin: () => {},
  setHasGameStarted: () => {},
};

const MastermindContext = createContext<MastermindContextType>(defaultValues);

export default MastermindContext;
