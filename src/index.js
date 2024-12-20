import React from 'react';
import { createRoot } from "react-dom/client";
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap aquí
import 'bootstrap-icons/font/bootstrap-icons.css';


const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

