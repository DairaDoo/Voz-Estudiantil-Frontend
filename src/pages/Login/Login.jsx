import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importamos Link para redirigir a otras páginas
import logo from '/voz-estudiantil-proyecto/Voz-Estudiantil-Frontend/src/assets/images/VozEstudiantil_logo.png'; // Importa la imagen del logo
import './Login.module.css';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Login:', { username, password });
    };

    return (
        <Container fluid className="vh-100 d-flex flex-column justify-content-center align-items-center">
            {/* Logo y Nombre de la Aplicación en la esquina superior izquierda */}
            <div className="position-absolute top-0 start-0 p-3">
                <div className="d-flex align-items-center">
                    {/* Usamos Link para hacer que el logo y el nombre redirijan a la página de inicio */}
                    <Link to="/" className="d-flex align-items-center text-decoration-none">
                        <img
                            src={logo}
                            alt="Logo"
                            className="logo me-2"
                            style={{ width: '50px', marginRight: '8px' }} // Conservamos el estilo en línea
                        />
                        <h1 className="app-name" style={{ fontSize: '2rem', color: '#000000' }}>Voz Estudiantil</h1> {/* Manteniendo estilo original */}
                    </Link>
                </div>
            </div>

            {/* Contenedor del formulario de inicio de sesión */}
            <Row className="w-100 justify-content-center">
                <Col xs={10} sm={7} md={7} lg={5} xl={5} className="p-4 shadow rounded bg-white">
                    <h2 className="text-center mb-4">¡Bienvenido de nuevo!</h2>
                    <form className="login-form" onSubmit={handleLogin}>
                        <label>Nombre de Usuario:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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

                        <a href="/recover-password" className="forgot-password d-block mb-3">¿Olvidaste tu contraseña?</a>

                        <button type="submit" className="btn w-100" style={{backgroundColor: '#22C0D4', borderColor: '#0B6673', color:'#fff', borderWidth: '2px'}}>Log In</button>
                    </form>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginPage;
