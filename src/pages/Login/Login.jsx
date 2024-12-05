import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '@/assets/images/VozEstudiantil_logo.png'; // Usa el alias definido en jsconfig.json
import styles from './Login.module.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook para manejar redirecciones

  useEffect(() => {
    // Cambiar el favicon al montar la página
    const favicon = document.querySelector("link[rel='icon']");
    const originalFavicon = favicon.href;
    favicon.href = "/logo-32x32.png"; // Ruta desde la carpeta public

    // Restaurar el favicon original al desmontar el componente
    return () => {
      favicon.href = originalFavicon;
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Limpiamos errores previos
  
    try {
      const response = await fetch('https://voz-estudiantil-backend.onrender.com/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
  
        // Guardar el token y el nombre del usuario en localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.name); // Guardamos el nombre del usuario
  
        alert(`¡Bienvenido ${data.name}! Log in exitoso.`);
        navigate('/'); // Redirigimos al home después del login
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Credenciales incorrectas');
      }
    } catch (err) {
      console.error('Error al conectar con el servidor:', err);
      setError('No se pudo conectar al servidor. Inténtalo más tarde.');
    }
  };
  

  return (
    <Container
      fluid
      className="vh-100 d-flex flex-column justify-content-center align-items-center"
    >
      {/* Logo y Nombre de la Aplicación */}
      <div className="position-absolute top-0 start-0 p-3">
        <div className="d-flex align-items-center">
          <Link to="/" className="d-flex align-items-center text-decoration-none">
            <img
              src={logo}
              alt="Logo"
              className="logo me-2"
              style={{ width: '50px', marginRight: '8px' }}
            />
            <h1 className="app-name" style={{ fontSize: '2rem', color: '#000000' }}>
              Voz Estudiantil
            </h1>
          </Link>
        </div>
      </div>

      {/* Contenedor del formulario de inicio de sesión */}
      <Row className="w-100 justify-content-center">
        <Col xs={10} sm={7} md={7} lg={5} xl={5} className="p-4 shadow rounded bg-white">
          <h2 className="text-center mb-4">¡Bienvenido de nuevo!</h2>
          <form className="login-form" onSubmit={handleLogin}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control mb-3"
              required
            />

            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control mb-3"
              required
            />

            {error && <p className="text-danger">{error}</p>}

            <a href="/recover_password" className="forgot-password d-block mb-3">
              ¿Olvidaste tu contraseña?
            </a>

            <button type="submit" className={`btn w-100 ${styles.loginButton}`}>
              Log In
            </button>

            <p className="text-center mt-3">
              ¿No tienes cuenta?{' '}
              <Link to="/signup" className="text-decoration-none">
                Regístrate aquí
              </Link>
            </p>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
