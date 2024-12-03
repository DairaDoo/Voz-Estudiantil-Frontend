import React, { useEffect, useState } from "react";
import { Navbar, FormControl, Button, InputGroup } from "react-bootstrap";
import styles from "./Navbar.module.css";
import logo_img from "@/assets/images/VozEstudiantil_logo.png";
import { useNavigate } from "react-router-dom";
import { useModal } from "@/components/NotLoggedIn/ModalContext";

function CustomNavbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const { setShowModal } = useModal(); // Accede a la función para mostrar el modal

  // Revisamos si el usuario ya está autenticado
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    if (token && userName) {
      setUser(userName); // Si está autenticado, guardamos el nombre del usuario
    }
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleLogoutClick = () => {
    // Limpiar el localStorage y redirigir al login
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login"); // Redirigir a la página de inicio
    setShowModal(true); // Muestra el modal de usuario no autenticado
    setUser(null); // Limpiar el estado
  
    // Puedes también enviar un evento global (opcional) para forzar la actualización
    window.dispatchEvent(new Event("logout"));
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

      <Navbar.Collapse id="navbarResponsive" className="justify-content-end">
        {/* Si el usuario está autenticado */}
        {user ? (
          <>
            {/* En la versión de escritorio */}
            <div className="d-none d-lg-flex align-items-center">
              <span className="me-3">Hola, {user}</span>
              <Button
                variant="outline-danger"
                onClick={handleLogoutClick}
                className="me-2"
              >
                Log Out
              </Button>
            </div>

            {/* En la versión móvil (dentro del toggle) */}
            <div className="d-lg-none d-flex flex-column align-items-center p-3">
              <span className="mb-2">Hola, {user}</span>
              <Button
                variant="outline-danger"
                onClick={handleLogoutClick}
                className={styles.logoutButton}
              >
                Log Out
              </Button>
            </div>
          </>
        ) : (
          // Si el usuario no está autenticado
          <div className="d-none d-lg-flex">
            <Button
              variant="outline-primary"
              onClick={handleLoginClick}
              className={`me-2 ${styles.mobileButton}`}
            >
              Log In
            </Button>
            <Button
              variant="primary"
              onClick={handleSignUpClick}
              className={styles.mobileButton}
            >
              Sign Up
            </Button>
          </div>
        )}

        {/* Botones móviles */}
        <div
          className={`d-lg-none d-flex flex-column align-items-center p-3 ${styles.mobileButtons}`}
        >
          {!user && (
            <>
              <Button
                variant="outline-primary"
                onClick={handleLoginClick}
                className={`mb-2 ${styles.mobileButton}`}
              >
                Log In
              </Button>
              <Button
                variant="primary"
                onClick={handleSignUpClick}
                className={styles.mobileButton}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;