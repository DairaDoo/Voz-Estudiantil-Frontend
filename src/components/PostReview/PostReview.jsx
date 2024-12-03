import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./PostReview.module.css";

function PostReview({ onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar la reseña
    console.log({ title, description, image });
    alert("Reseña creada con éxito!");
    onClose(); // Cerrar el formulario
  };

  return (
    <div className={`position-fixed top-0 start-0 w-100 h-100 ${styles.overlay}`}>
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="bg-white rounded p-4 shadow" style={{ maxWidth: "400px", width: "90%" }}>
          {/* Botón para cerrar */}
          <button
            className="btn-close position-absolute top-0 end-0 m-3"
            aria-label="Cerrar"
            onClick={onClose}
          ></button>
          {/* Título */}
          <h4 className="text-center mb-4">Crear Nueva Reseña</h4>
          {/* Formulario */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Título
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Añade un título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required // Solo el título es obligatorio
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Descripción
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="4"
                placeholder="Escribe una descripción (opcional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Imagen (opcional)
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Crear Reseña
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostReview;
