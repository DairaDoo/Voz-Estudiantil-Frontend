import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./PostReview.module.css";
import NotLoggedIn from "@/components/NotLoggedIn/NotLoggedIn";

function PostReview({ onClose, apiUrl }) {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState("");
  const [universityId, setUniversityId] = useState("");
  const [universityName, setUniversityName] = useState("");
  const [campusId, setCampusId] = useState("");
  const [campusName, setCampusName] = useState("");
  const [universities, setUniversities] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [state, setState] = useState("pendiente");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loadingCampuses, setLoadingCampuses] = useState(false);

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

  useEffect(() => {
    fetch(`https://voz-estudiantil-backend.onrender.com/universities`)
      .then((response) => response.json())
      .then((data) => setUniversities(data))
      .catch((error) => console.error("Error al cargar universidades:", error));
  }, [apiUrl]);

  useEffect(() => {
    if (universityId) {
      const selectedUniversity = universities.find(
        (uni) => uni.university_id === parseInt(universityId)
      );
      if (selectedUniversity) {
        setUniversityName(selectedUniversity.name);
        handleUniversityChange(selectedUniversity.university_id);
      }
    }
  }, [universityId, universities]);

  const handleUniversityChange = (selectedUniversityId) => {
    setUniversityId(selectedUniversityId);
    setLoadingCampuses(true);
    fetch(`https://voz-estudiantil-backend.onrender.com/campuses?university_id=${selectedUniversityId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos del servidor");
        }
        return response.json();
      })
      .then((data) => {
        setCampuses(data);
        setLoadingCampuses(false);
      })
      .catch((error) => {
        console.error("Error al cargar campus:", error);
        setCampuses([]);
        setLoadingCampuses(false);
      });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("Por favor, inicie sesión para crear una reseña.");
      return;
    }

    if (!description || !universityId || !campusId) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    const formData = new FormData();
    formData.append("review", description);
    formData.append("user_id", userId);
    formData.append("university_id", universityId);
    formData.append("state", state);
    if (image) {
      formData.append("image", image);
    }
    formData.append("campus_id", campusId);

    try {
      const response = await fetch(`https://voz-estudiantil-backend.onrender.com/reviews`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Reseña creada con éxito!");
        window.location.reload(); // Refrescar la página
      } else {
        alert("Error al crear la reseña. Por favor, inténtelo nuevamente.");
      }
    } catch (error) {
      console.error("Error al enviar reseña:", error);
      alert("Hubo un problema al enviar la reseña. Intenta nuevamente.");
    }
  };

  if (!isLoggedIn) {
    return (
      <NotLoggedIn
        show={true}
        onClose={onClose}
        actionMessage="Para crear una reseña, necesitas estar logueado."
      />
    );
  }

  return (
    <div className={`position-fixed top-0 start-0 w-100 h-100 ${styles.overlay}`}>
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="bg-white rounded p-4 shadow position-relative" style={{ maxWidth: "400px", width: "90%" }}>
          {/* Botón de cerrar dentro del formulario */}
          <button
            className="btn-close position-absolute top-0 end-0 m-3"
            aria-label="Cerrar"
            onClick={onClose}
            style={{ zIndex: 10 }}
          ></button>
          <h4 className="text-center mb-4">Crear Nueva Reseña</h4>
          <form onSubmit={handleSubmit}>
            {universityId ? (
              <div className="mb-3">
                <label htmlFor="universityName" className="form-label">Universidad:</label>
                <input
                  type="text"
                  id="universityName"
                  className="form-control"
                  value={universityName}
                  readOnly
                />
              </div>
            ) : (
              <div className="mb-3">
                <label htmlFor="universityId" className="form-label">Selecciona tu Universidad:</label>
                <select
                  className="form-control"
                  id="universityId"
                  value={universityId}
                  onChange={(e) => handleUniversityChange(e.target.value)}
                  required
                >
                  <option value="">Selecciona una universidad</option>
                  {universities.map((university) => (
                    <option key={university.university_id} value={university.university_id}>
                      {university.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {universityId && (
              <div className="mb-3">
                <label htmlFor="campusId" className="form-label">Campus:</label>
                <select
                  className="form-control"
                  id="campusId"
                  value={campusId}
                  onChange={(e) => setCampusId(e.target.value)}
                  required
                >
                  <option value="">Selecciona un campus</option>
                  {loadingCampuses ? (
                    <option disabled>Cargando...</option>
                  ) : campuses.length > 0 ? (
                    campuses.map((campus) => (
                      <option key={campus.id} value={campus.id}>
                        {campus.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>No hay campus disponibles</option>
                  )}
                </select>
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Descripción:</label>
              <textarea
                className="form-control"
                id="description"
                rows="4"
                placeholder="Escribe una reseña..."
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
              <label htmlFor="image" className="form-label">Imagen (opcional):</label>
              <input
                type="file"
                className="form-control"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <button type="submit" className={styles.sendReviewButton}>Enviar Reseña</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostReview;
