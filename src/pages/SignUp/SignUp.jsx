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
    university: "", // Añadimos un campo para la universidad
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("SignUp Data:", formData);

    // Aquí podrías añadir la lógica de validación y envío al backend
    if (!formData.university) {
      alert("Por favor selecciona tu universidad");
      return;
    }

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
      <Row
        className="w-100 justify-content-center"
        style={{ marginTop: "75px" }}
      >
        <Col
          xs={10}
          sm={8}
          md={8}
          lg={6}
          xl={6}
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

            <label>Universidad:</label>
            <select
              name="university"
              value={formData.university}
              onChange={handleInputChange}
              className="form-control mb-3"
              required
            >
              <option value="" disabled>
                Selecciona tu universidad
              </option>
              <option value="Universidad Interamericana de Puerto Rico - Arecibo">
                Universidad Interamericana de Puerto Rico - Arecibo
              </option>
              <option value="Universidad de Puerto Rico - Recinto de Río Piedras">
                Universidad de Puerto Rico - Recinto de Río Piedras
              </option>
              <option value="Universidad del Sagrado Corazón">
                Universidad del Sagrado Corazón
              </option>
              <option value="Universidad Ana G. Méndez">
                Universidad Ana G. Méndez
              </option>
            </select>

            <button
              type="submit"
              className={`btn w-100 ${styles.signUpButton}`}
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
