import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import axe from 'react-axe';
import App from './app.js';

window.onload = () => {
  axe(React, ReactDOM, 1000);

  const container = document.getElementById('root');
  const root = createRoot(container);
  root.render(<App />);
};
