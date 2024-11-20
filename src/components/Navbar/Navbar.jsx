import React from "react";
import { Navbar, FormControl, Button, InputGroup } from "react-bootstrap";
import styles from "./Navbar.module.css";
import logo_img from "@/assets/images/VozEstudiantil_logo.png";
import { useNavigate } from "react-router-dom"; // Importamos el hook useNavigate para redirigir al login
import React from 'react';
import { Navbar, FormControl, Button, InputGroup } from 'react-bootstrap';
import styles from './Navbar.module.css';
import logo_img from '/VozEstudiantil_FrontEnd/Voz-Estudiantil-Frontend/src/assets/images/VozEstudiantil_logo.png';

function CustomNavbar() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <Navbar expand="lg" bg="light" variant="light" className="px-3">
      <Navbar.Brand href="#" className="d-flex align-items-center">
        <img
          src={logo_img}
          alt="Logo"
          className="d-inline-block align-top"
          style={{ width: "50px", marginRight: "8px" }}
        />
        <span className="d-none d-lg-inline h2">Voz Estudiantil</span>
      </Navbar.Brand>

      <div
        className={`flex-grow-1 d-flex justify-content-center ${styles.searchContainer}`}
      >
        <InputGroup className="w-100">
          <InputGroup.Text className={`search-icon ${styles.searchIcon}`}>
            <i className="bi bi-search"></i>
          </InputGroup.Text>
          <FormControl
            type="search"
            placeholder="Buscar"
            className={`search-input ${styles.searchInput}`}
            aria-label="Search"
          />
        </InputGroup>
      </div>

      <Navbar.Toggle aria-controls="navbarResponsive" className="mb-0 ms-2" />

      <Navbar.Toggle aria-controls="navbarResponsive" className="mb-0" />

      <Navbar.Collapse id="navbarResponsive" className="justify-content-end">
        {/* Botones de escritorio reutilizando el estilo de mobileButton */}
        <div className={`d-none d-lg-flex`}>
          <Button
            variant="outline-primary"
            onClick={handleLoginClick}
            className={`me-2 ${styles.mobileButton}`}
          >
            Login
          </Button>=
          <Button variant="primary" className={styles.mobileButton}>
            Signup
          </Button>
        </div>

        {/* Botones móviles */}
        <div
          className={`d-lg-none d-flex flex-column align-items-center p-3 ${styles.mobileButtons}`}
        >
          <Button
            variant="outline-primary"
            onClick={handleLoginClick}
            className={`mb-2 ${styles.mobileButton}`}
          >
            Login
          </Button>
          <Button variant="primary" className={styles.mobileButton}>
            Signup
          </Button>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
