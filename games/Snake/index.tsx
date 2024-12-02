import React from 'react';

import Snake from './snake.tsx';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Snake />
  </React.StrictMode>,
);
