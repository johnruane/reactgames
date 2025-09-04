import React from 'react';

import Minesweeper from './minesweeper.tsx';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Minesweeper restartClickHandler={() => window.location.reload()} />
  </React.StrictMode>,
);
