import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './assets/style.scss';
import { StoreProvider } from './v1/context/globalContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
);
