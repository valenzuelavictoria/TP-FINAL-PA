import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';  // Asegúrate de usar 'react-dom/client' en vez de 'react-dom/'
import './index.css';
import App from './App.jsx';  // Corrige el import a un path relativo

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
