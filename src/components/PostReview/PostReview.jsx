import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./PostReview.module.css";
import NotLoggedIn from "@/components/NotLoggedIn/NotLoggedIn";

function PostReview({ onClose, apiUrl, onRefresh }) {
  const [description, setDescription] = useState(""); // Descripción de la reseña
  const [image, setImage] = useState(null); // Imagen de la reseña
  const [userId, setUserId] = useState(""); // ID del usuario
  const [universityId, setUniversityId] = useState(""); // ID de la universidad
  const [universityName, setUniversityName] = useState(""); // Nombre de la universidad
  const [campusId, setCampusId] = useState(""); // ID del campus
  const [campusName, setCampusName] = useState(""); // Nombre del campus
  const [universities, setUniversities] = useState([]); // Lista de universidades
  const [campuses, setCampuses] = useState([]); // Lista de campus
  const [state, setState] = useState("pendiente"); // Estado de la reseña
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loadingCampuses, setLoadingCampuses] = useState(false); // Cargando campus

  // Obtener datos del token y guardar en localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUserId(decodedToken.user_id);
      setUniversityId(decodedToken.university_id);
      localStorage.setItem("university_id", decodedToken.university_id);
    } catch (error) {
      setIsLoggedIn(false);
    }
  }, []);

  // Cargar lista de universidades
  useEffect(() => {
    fetch(`http://localhost:5000/universities`) // Usamos apiUrl aquí
      .then((response) => response.json())
      .then((data) => setUniversities(data))
      .catch((error) => console.error("Error al cargar universidades:", error));
  }, [apiUrl]);

  // Obtener el nombre de la universidad
  useEffect(() => {
    if (universityId) {
      const selectedUniversity = universities.find(
        (uni) => uni.university_id === parseInt(universityId)
      );
      if (selectedUniversity) {
        setUniversityName(selectedUniversity.name);
        handleUniversityChange(selectedUniversity.university_id); // Cargar campus
      }
    }
  }, [universityId, universities]);

  // Manejar cambio de universidad
  const handleUniversityChange = (selectedUniversityId) => {
    if (selectedUniversityId) {
      setLoadingCampuses(true); // Mostrar indicador de carga
      fetch(`http://localhost:5000/campuses?university_id=${selectedUniversityId}`, {
        method: "GET",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener los datos del servidor");
          }
          return response.json();
        })
        .then((data) => {
          setCampuses(data); // Actualizar lista de campus
          setLoadingCampuses(false); // Detener carga
        })
        .catch((error) => {
          console.error("Error al cargar campus:", error);
          setCampuses([]); // No hay campus disponibles
          setLoadingCampuses(false);
        });
    }
  };

  // Manejar cambio de imagen
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("Por favor, inicie sesión para crear una reseña.");
      return;
    }

    // Validación de todos los campos antes de enviar
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
      formData.append("image", image); // Solo si se selecciona una imagen
    }
    formData.append("campus_id", campusId);  // Enviar solo el ID del campus

    // Agregar un console.log aquí para ver los datos que se están enviando
    console.log("Datos a enviar:", {
      review: description,
      user_id: userId,
      university_id: universityId,
      state: state,
      image: image ? image.name : null, // Solo muestra el nombre del archivo de imagen
      campus_id: campusId,  // El ID del campus
    });

    try {
      const response = await fetch(`http://localhost:5000/reviews`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Reseña creada con éxito!");
        onClose();
        if (onRefresh) {
          onRefresh();  // Llamar a la función de refresh para actualizar la lista
        }
      } else {
        const errorData = await response.json();
        console.log("Error del servidor:", errorData);
        alert(`Error: ${errorData.error || 'Ocurrió un error inesperado'}`);
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
        <div className="bg-white rounded p-4 shadow" style={{ maxWidth: "400px", width: "90%" }}>
          <button
            className="btn-close position-absolute top-0 end-0 m-3"
            aria-label="Cerrar"
            onClick={onClose}
          ></button>
          <h4 className="text-center mb-4">Crear Nueva Reseña</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="universityName" className="form-label">Universidad</label>
              <input
                type="text"
                className="form-control"
                id="universityName"
                value={universityName}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="campusId" className="form-label">Campus</label>
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
                  <option key="no-campus" disabled>No hay campus disponibles</option>
                )}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Descripción</label>
              <textarea
                className="form-control"
                id="description"
                rows="4"
                placeholder="Escribe una reseña..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Imagen</label>
              <input
                type="file"
                className="form-control"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Enviar Reseña
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostReview;
