import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/images/VozEstudiantil_logo.png";
import styles from "./SignUp.module.css";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    university: "",
  });
  const [focusField, setFocusField] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Validaciones dinámicas
    if (name === "username") {
      validateUsername(value);
    } else if (name === "password") {
      validatePassword(value);
    }
  };

  const validateUsername = (username) => {
    if (username.length > 10) {
      setErrors((prev) => ({
        ...prev,
        username: "El nombre de usuario debe tener menos de 10 caracteres.",
      }));
    } else if (/nombre|personal|usuario/i.test(username)) {
      setErrors((prev) => ({
        ...prev,
        username: "No debe incluir información personal como 'nombre', etc.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, username: "" }));
    }
  };

  const validatePassword = (password) => {
    if (!/[A-Z]/.test(password)) {
      setErrors((prev) => ({
        ...prev,
        password: "Debe incluir al menos una letra mayúscula.",
      }));
    } else if (!/[a-z]/.test(password)) {
      setErrors((prev) => ({
        ...prev,
        password: "Debe incluir al menos una letra minúscula.",
      }));
    } else if (!/\d/.test(password)) {
      setErrors((prev) => ({
        ...prev,
        password: "Debe incluir al menos un número.",
      }));
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setErrors((prev) => ({
        ...prev,
        password: "Debe incluir al menos un carácter especial.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!formData.university) {
      alert("Por favor selecciona tu universidad");
      return;
    }

    if (errors.username || errors.password) {
      alert("Por favor corrige los errores antes de continuar.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/users/create_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.username,
          email: formData.email,
          password: formData.password,
          university_id: getUniversityId(formData.university),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al registrar el usuario");
      }

      const data = await response.json();
      console.log("Usuario registrado:", data);

      navigate("/");

      alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
    } catch (error) {
      console.error("Error en el registro:", error);
      alert(error.message || "Error al registrar el usuario.");
    }
  };

  const getUniversityId = (universityName) => {
    const universities = {
      "Universidad Interamericana de Puerto Rico - Arecibo": 1,
      "Universidad de Puerto Rico - Recinto de Río Piedras": 2,
      "Universidad del Sagrado Corazón": 3,
      "Universidad Ana G. Méndez": 4,
    };
    return universities[universityName] || null;
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex flex-column justify-content-center align-items-center"
    >
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
              onFocus={() => setFocusField("username")}
              onBlur={() => setFocusField("")}
              onChange={handleInputChange}
              className="form-control mb-1"
              required
            />
            {focusField === "username" && (
              <small className="text-muted d-block">
                - Menos de 10 caracteres.<br />
                - Sin información personal como tu nombre.
              </small>
            )}
            {errors.username && (
              <small className="text-danger d-block">{errors.username}</small>
            )}

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
              onFocus={() => setFocusField("password")}
              onBlur={() => setFocusField("")}
              onChange={handleInputChange}
              className="form-control mb-1"
              required
            />
            {focusField === "password" && (
              <small className="text-muted d-block">
                - Al menos una mayúscula<br/>
                - Al menos una letra minúscula<br/>
                - Al menos un número<br/>
                - Al menos un carácter especial
              </small>
            )}
            {errors.password && (
              <small className="text-danger d-block">{errors.password}</small>
            )}

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
