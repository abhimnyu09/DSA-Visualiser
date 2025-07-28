// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import DSAVisualizer from './DSAVisualizer.jsx'; // Corrected import
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DSAVisualizer /> {/* Corrected component */}
  </React.StrictMode>,
);