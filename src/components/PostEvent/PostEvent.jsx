import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./PostEvent.module.css"; // Reutilizando estilos

function PostEvent({ onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState(""); // Para mostrar mensaje de éxito o error
  const [loading, setLoading] = useState(false); // Para manejar el estado de carga

  // Obtener user_id, university_id y el token de localStorage
  const user_id = localStorage.getItem("user_id");
  const university_id = localStorage.getItem("university_id");
  const token = localStorage.getItem("token"); // Obtener el token del localStorage

  // Manejar cambios en la imagen
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reiniciar mensaje previo
    setLoading(true); // Activar estado de carga

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("image", image); // Se adjunta la imagen como archivo
    formData.append("user_id", user_id);
    formData.append("university_id", university_id);

    // Crear la fecha de creación en formato similar al JSON esperado
    const create_date = new Date().toUTCString();

    try {
      const response = await fetch("http://127.0.0.1:5000/events", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Agregar el token de autorización al encabezado
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Error al crear el evento");

      const result = await response.json();
      console.log(result);
      setMessage("¡Evento creado con éxito!"); // Mensaje de éxito
      onClose(); // Cerrar el formulario
    } catch (err) {
      setMessage(`Error: ${err.message}`); // Mostrar el error
    } finally {
      setLoading(false); // Desactivar el estado de carga
    }
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
            {message && (
              <div className="alert alert-info text-center" role="alert">
                {message}
              </div>
            )}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Creando..." : "Crear Evento"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostEvent;
