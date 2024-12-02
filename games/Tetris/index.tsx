import React from 'react';

import Tetris from './tetris.tsx';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Tetris />
  </React.StrictMode>
);
