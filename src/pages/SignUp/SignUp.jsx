import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "@/assets/images/VozEstudiantil_logo.png";
import styles from "./SignUp.module.css"; // Cambiamos el nombre del módulo CSS para evitar conflictos

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("SignUp Data:", formData);

    // Aquí podrías añadir la lógica de validación y envío al backend
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Simular redirección al iniciar sesión
    alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex flex-column justify-content-center align-items-center"
    >
      {/* Logo y Nombre de la Aplicación */}
      <div className="position-absolute top-0 start-0 p-3">
        <div className="d-flex align-items-center">
          <Link
            to="/"
            className="d-flex align-items-center text-decoration-none"
          >
            <img
              src={logo}
              alt="Logo"
              className="logo me-2"
              style={{ width: "50px", marginRight: "8px" }}
            />
            <h1
              className="app-name"
              style={{ fontSize: "2rem", color: "#000000" }}
            >
              Voz Estudiantil
            </h1>
          </Link>
        </div>
      </div>

      {/* Contenedor del formulario de registro */}
      <Row className="w-100 justify-content-center">
        <Col
          xs={10}
          sm={7}
          md={7}
          lg={5}
          xl={5}
          className="p-4 shadow rounded bg-white"
        >
          <h2 className="text-center mb-4">Crea tu cuenta</h2>
          <form className="signup-form" onSubmit={handleSignUp}>
            <label>Nombre de Usuario:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="form-control mb-3"
              required
            />

            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-control mb-3"
              required
            />

            <label>Contraseña:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-control mb-3"
              required
            />

            <label>Confirmar Contraseña:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="form-control mb-3"
              required
            />

            <button
              type="submit"
              className={`btn w-100 ${styles.signUpButton}`} // Aplicamos la clase del módulo CSS
            >
              Registrarme
            </button>
          </form>
          <p className="text-center mt-3">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-decoration-none">
              Inicia sesión aquí
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp;
