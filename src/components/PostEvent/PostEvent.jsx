import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./PostEvent.module.css"; // Reutilizando estilos
import NotLoggedIn from "@/components/NotLoggedIn/NotLoggedIn";

function PostEvent({ onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState("");
  const [universityId, setUniversityId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const apiUrl = "http://localhost:5000"; // URL de la API con puerto 5000
  const MAX_DESCRIPTION_LENGTH = 1500;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUserId(decodedToken.user_id);
      setUniversityId(decodedToken.university_id || "");
    } catch (error) {
      setIsLoggedIn(false);
    }
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("Por favor, inicie sesión para crear un evento.");
      return;
    }

    if (!title || !description) {
      alert("Por favor, complete todos los campos requeridos.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("user_id", userId);
    formData.append("university_id", universityId);
    if (image) {
      formData.append("image", image);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}/events`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert("Evento creado con éxito!");
        window.location.reload();
      } else {
        const errorData = await response.json();
        alert(`Error al crear el evento: ${errorData.error || "Intenta nuevamente."}`);
      }
    } catch (error) {
      console.error("Error al enviar evento:", error);
      alert("Hubo un problema al enviar el evento. Intenta nuevamente.");
    }
  };

  if (!isLoggedIn) {
    return (
      <NotLoggedIn
        show={true}
        onClose={onClose}
        actionMessage="Para crear un evento, necesitas estar logueado."
      />
    );
  }

  return (
    <div className={`position-fixed top-0 start-0 w-100 h-100 ${styles.overlay}`}>
      <div className="d-flex justify-content-center align-items-center h-100">
        <div
          className={`bg-white rounded p-4 shadow-lg position-relative container-fluid ${styles.formContainer}`}
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
                Título del Evento:
              </label>
              <input
                type="text"
                id="title"
                className="form-control"
                placeholder="Ingresa el título del evento"
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
                rows="4"
                placeholder="Escribe una descripción del evento..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={MAX_DESCRIPTION_LENGTH}
                required
              ></textarea>
              <small className="text-muted">
                {description.length}/{MAX_DESCRIPTION_LENGTH} caracteres
              </small>
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Imagen (opcional):
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <button type="submit" className={`btn btn-primary ${styles.sendEventButton}`}>
              Crear Evento
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostEvent;
