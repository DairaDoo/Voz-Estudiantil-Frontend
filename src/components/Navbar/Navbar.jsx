import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import styles from './Navbar.module.css';
import logo_img from '/voz-estudiantil-proyecto/Voz-Estudiantil-Frontend/src/assets/images/VozEstudiantil_logo.png';

const TestingNavbar = () => {
  return (
    <Navbar bg="light" expand="lg" className="p-3">
      <Container fluid>
        {/* Logo y Nombre */}
        <Navbar.Brand className={styles.navbarBrand}>
          <img src={logo_img} alt="Logo" className={styles.logo} />
          <span className="h2 m-0 d-none d-lg-inline">VozEstudiantil</span>
        </Navbar.Brand>

        {/* Barra de búsqueda siempre visible */}
        <div className={`${styles.searchBar} input-group mx-auto`}>
          <div className="input-group-prepend">
            <span className={`${styles.searchIcon} input-group-text border-0`}>
              <i className="bi bi-search"></i>
            </span>
          </div>
          <input type="text" className="form-control border-0" placeholder="Search" />
        </div>

        {/* Botón de menú para móviles */}
        <Navbar.Toggle aria-controls="navbarResponsive" />

        {/* Contenido colapsable (Login y Signup) */}
        <Navbar.Collapse id="navbarResponsive" className="justify-content-end">
          {/* Botones solo visibles en escritorio */}
          <div className="d-none d-lg-flex align-items-center">
            <button className={`btn btn-info mx-2 ${styles.buttonGroup}`}>Log In</button>
            <button className={`btn btn-info ${styles.buttonGroup}`}>Sign Up</button>
          </div>

          {/* Dropdown solo para móviles */}
          <div className={`${styles.mobileContainer} d-flex d-lg-none`}>
            <div className="d-flex justify-content-around w-100 pt-2">
              <button className={`btn btn-info ${styles.buttonGroup}`}>Log In</button>
              <button className={`btn btn-info ${styles.buttonGroup}`}>Sign Up</button>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TestingNavbar;
