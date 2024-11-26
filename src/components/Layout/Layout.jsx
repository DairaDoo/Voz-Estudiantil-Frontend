// src/components/Layout/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';  // Importa Outlet
import CustomNavbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';
import OptionsContainer from '../Contenedor/OptionsContainer';

const Layout = () => (
  <div className={`d-flex flex-column min-vh-100 ${styles.layout}`}>
    <CustomNavbar />
    <main className="flex-grow-1">
      <Outlet />  {/* Aquí se renderizan las rutas hijas */}
      <OptionsContainer></OptionsContainer>
    </main>
    <Footer />
  </div>
);

export default Layout;
