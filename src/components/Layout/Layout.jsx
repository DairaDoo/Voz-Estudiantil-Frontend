// src/components/Layout/Layout.jsx
import React from 'react';
import CustomNavbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css'; // Importa como un objeto
import TestingNavbar from '../Navbar/Navbar';


// El componente Layout es donde ponen el contenido que quieren
// que se vea en todas las páginas como el (Footer.jsx y Navbar)
// El children representa 

const Layout = ({ children }) => (
  <div className={`d-flex flex-column min-vh-100 ${styles.layout}`}> {/* Clase flexbox de Bootstrap */}
    {/* este es el navbar */}
    <TestingNavbar /> 
    <main className="flex-grow-1"> {/* Clase para crecer y ocupar el espacio disponible */}
      {children}
    </main>
    {/* Este es el footer. */}
    <Footer />
  </div>
);

export default Layout;
