import React from "react";

const NotLoggedIn = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">¡Acción no permitida!</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <p>Para votar, necesitas tener una cuenta y estar logueado.</p>
            <p>¡Regístrate ahora y participa!</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={() => window.location.href = "/login"}>
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotLoggedIn;
