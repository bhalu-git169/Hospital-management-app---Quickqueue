import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // add this
import './index.css';
import App from './App';
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/Hospital-management-app---Quickqueue/">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

