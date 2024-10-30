import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo_img from '/voz-estudiantil-proyecto/Voz-Estudiantil-Frontend/src/assets/images/VozEstudiantil_logo.png'; // Cambié a alias

const TestingNavbar = () => {
  return (
    <nav className="navbar navbar-light bg-light d-flex justify-content-between p-3">
      <div className="d-flex align-items-center">
        <img src={logo_img} alt="Logo" style={{ width: '50px' }} className="mr-2" />
        <h1 className="h4 m-0">VozEstudiantil</h1>
      </div>
      <div className="input-group" style={{ width: '400px', border: '1px solid #343a40', borderRadius: '4px' }}>
        <div className="input-group-prepend">
          <span className="input-group-text bg-light border-0" style={{ borderRight: '1px solid #343a40' }}>
            <i className="bi bi-search"></i>
          </span>
        </div>
        <input type="text" className="form-control border-0" placeholder="Search" />
      </div>
      <div>
        <button className="btn btn-info mx-2">Log In</button>
        <button className="btn btn-info">Sign Up</button>
      </div>
    </nav>
  );
};

export default TestingNavbar;
