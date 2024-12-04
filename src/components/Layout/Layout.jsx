// src/components/Layout/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom'; // Importa Outlet
import CustomNavbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';
import OptionsContainer from '@/components/OptionsContainer/OptionsContainer'; // Asegúrate de importar correctamente

const Layout = () => (
  <div className={`d-flex flex-column min-vh-100 ${styles.layout}`}>
    <CustomNavbar />
    <main className="flex-grow-1">
      <Outlet />
    </main>
    {/* El OptionsContainer sigue siendo parte del layout */}
    <OptionsContainer />
    <Footer />
  </div>
);

export default Layout;
