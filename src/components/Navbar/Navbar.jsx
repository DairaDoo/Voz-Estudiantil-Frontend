import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import styles from './Navbar.module.css';
import logo_img from '/voz-estudiantil-proyecto/Voz-Estudiantil-Frontend/src/assets/images/VozEstudiantil_logo.png';

const TestingNavbar = () => {
  return (
    <Navbar bg="light" expand="lg" className="p-3">
      <Container fluid>
        <Navbar.Brand className={styles.navbarBrand}>
          <img src={logo_img} alt="Logo" className={styles.logo} />
          <span className="h2 m-0">VozEstudiantil</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbarResponsive" />

        <Navbar.Collapse id="navbarResponsive" className="justify-content-between">
          <div className={`${styles.searchBar} input-group d-none d-lg-flex mx-auto`}>
            <div className="input-group-prepend">
              <span className={`${styles.searchIcon} input-group-text border-0`}>
                <i className="bi bi-search"></i>
              </span>
            </div>
            <input type="text" className="form-control border-0" placeholder="Search" />
          </div>
          
          <div className="d-none d-lg-flex align-items-center">
            <button className={`btn btn-info mx-2 ${styles.buttonGroup}`}>Log In</button>
            <button className={`btn btn-info ${styles.buttonGroup}`}>Sign Up</button>
          </div>
          
          <div className={`${styles.mobileContainer} d-flex d-lg-none`}>
            <div className={`${styles.searchBar} input-group mb-2`}>
              <div className="input-group-prepend">
                <span className={`${styles.searchIcon} input-group-text border-0`}>
                  <i className="bi bi-search"></i>
                </span>
              </div>
              <input type="text" className="form-control border-0" placeholder="Search" />
            </div>
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
