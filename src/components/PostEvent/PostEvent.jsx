import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./PostEvent.module.css"; // Reutilizando estilos

function PostEvent({ onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState(""); // Nueva variable de estado para la hora
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de la imagen
    if (!image) {
      alert("Por favor, sube una imagen para el evento.");
      return;
    }

    // Lógica para enviar el evento
    console.log({ title, description, date, time, location, image });
    alert("Evento creado con éxito!");
    onClose(); // Cerrar el formulario
  };

  return (
    <div className={`position-fixed top-0 start-0 w-100 h-100 ${styles.overlay}`}>
      <div className="d-flex justify-content-center align-items-center h-100">
        <div
          className="bg-white rounded p-4 shadow-lg position-relative container-fluid"
          style={{
            width: "90%", // Ajuste responsivo del ancho (90% del viewport)
            maxWidth: "500px", // Tamaño máximo del ancho
            height: "auto", // Altura dinámica basada en el contenido
            maxHeight: "90vh", // Tamaño máximo de altura (90% del viewport height)
            overflowY: "auto", // Scroll en caso de contenido excesivo
          }}
        >
          {/* Botón para cerrar */}
          <div className="text-end">
            <button className="btn-close" aria-label="Cerrar" onClick={onClose}></button>
          </div>

          {/* Título */}
          <h4 className="text-center mb-4">Crear Nuevo Evento</h4>

          {/* Formulario */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Título:
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Añade un título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Descripción:
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                placeholder="Escribe una descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength="1500" // Establece el límite de caracteres
              />
              <small className="text-muted">{description.length} / 1500 caracteres</small>
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Fecha del Evento:
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="time" className="form-label">
                Hora del Evento:
              </label>
              <input
                type="time"
                className="form-control"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                Lugar:
              </label>
              <input
                type="text"
                className="form-control"
                id="location"
                placeholder="Ejemplo: Auditorio Principal"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Imagen:
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                required // Marcamos el campo como obligatorio para HTML
              />
            </div>
            <div className="d-grid">
              <button type="submit" className={`btn ${styles.createEventButton}`}>
                Crear Evento
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostEvent;
