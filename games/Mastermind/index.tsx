import React from 'react';

import Mastermind from './mastermind.tsx';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Mastermind />
  </React.StrictMode>
);
