import React, { useEffect, useState } from "react";
import NotLoggedIn from "@/components/NotLoggedIn/NotLoggedIn";

const ShowReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para saber si el usuario está logueado
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
  const [userVotes, setUserVotes] = useState({}); // Para almacenar el voto del usuario por reseña

  useEffect(() => {
    // Verificar si el usuario está logueado con el token de localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:5000/reviews_with_names");
        if (!response.ok) throw new Error("Error al obtener los reviews");
        const data = await response.json();
        // Ordenar reseñas por la diferencia entre up_vote y down_vote
        data.sort((a, b) => (b.up_vote - b.down_vote) - (a.up_vote - a.down_vote));
        setReviews(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchReviews();
  }, []); // Solo se ejecuta una vez al cargar el componente

  const handleVote = async (reviewId, type) => {
    if (!isLoggedIn) {
      setShowModal(true); // Mostrar el modal si no está logueado
      return; // Evitar seguir con el proceso de votación si no está logueado
    }

    // Verificar si el usuario ya votó en esta reseña
    if (userVotes[reviewId] === type) {
      return; // Evitar votar si ya votó de la misma manera
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/reviews/${reviewId}/votes`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ type }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error en la solicitud");
      }

      // Actualizar los votos de la reseña
      const updatedReviews = reviews.map((review) => {
        if (review.review_id === reviewId) {
          if (type === "up") review.up_vote += 1;
          else if (type === "down") review.down_vote += 1;
        }
        return review;
      });

      // Actualizar el estado de los votos del usuario
      setUserVotes((prevVotes) => ({
        ...prevVotes,
        [reviewId]: type, // Registrar el voto del usuario
      }));

      updatedReviews.sort((a, b) => (b.up_vote - b.down_vote) - (a.up_vote - a.down_vote));
      setReviews(updatedReviews);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  };

  const handleComments = (reviewId) => {
    console.log(`Abrir sección de comentarios para el review ID: ${reviewId}`);
  };

  const handleCloseModal = () => {
    setShowModal(false); // Cerrar el modal
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Reseñas</h1>
      {error && <p className="text-danger text-center">{error}</p>}
      {!reviews.length && !error && <p className="text-center">Cargando reseñas...</p>}

      <div className="row">
        {reviews.map((review) => (
          <div key={review.review_id} className="col-12 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded-circle bg-dark text-white d-flex justify-content-center align-items-center me-3"
                      style={{ width: "40px", height: "40px", fontSize: "20px" }}
                    >
                      <i className="bi bi-person-circle"></i>
                    </div>
                    <div>
                      <h5 className="mb-0" style={{ fontSize: "19px" }}>
                        {review.user_name || "Anónimo"}
                      </h5>
                      <small className="text-muted" style={{ fontSize: "17px" }}>
                        {new Date(review.create_date).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                  <div className="text-end">
                    <small className="text-muted" style={{ fontSize: "16px" }}>
                      {review.university_name}
                      {review.campus_name ? ` - ${review.campus_name}` : ""}
                    </small>
                  </div>
                </div>

                <p className="card-text fs-6">{review.review || "Sin descripción"}</p>

                {review.image_name ? (
                  <div className="d-flex justify-content-center mb-3">
                    <img
                      src={`https://res.cloudinary.com/dzgfxbf16/image/upload/${review.image_name}`}
                      alt="Imagen de la reseña"
                      className="img-fluid rounded"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "460px",
                        border: "1px solid #ddd",
                        borderRadius: "10px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ) : (
                  <div className="bg-light text-center py-3 rounded mb-3">
                    <small className="text-muted">Sin imagen</small>
                  </div>
                )}

                <div className="d-flex justify-content-start align-items-center">
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => handleVote(review.review_id, "up")}
                    style={{ fontSize: "17px", padding: "6px 12px" }}
                    disabled={userVotes[review.review_id] === "up"} // Deshabilitar si ya votó
                  >
                    <i className="bi bi-hand-thumbs-up-fill"></i>
                  </button>

                  <span className="fw-bold fs-5 me-2" style={{ fontSize: "17px" }}>
                    {review.up_vote - review.down_vote}
                  </span>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleVote(review.review_id, "down")}
                    style={{ fontSize: "17px", padding: "6px 12px" }}
                    disabled={userVotes[review.review_id] === "down"} // Deshabilitar si ya votó
                  >
                    <i className="bi bi-hand-thumbs-down-fill"></i>
                  </button>

                  <button
                    className="btn btn-outline-secondary btn-sm ms-2"
                    onClick={() => handleComments(review.review_id)}
                    style={{ fontSize: "17px", padding: "6px 12px" }}
                  >
                    <i className="bi bi-chat-dots"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <NotLoggedIn 
          show={showModal} 
          onClose={handleCloseModal} 
          actionMessage="Para votar, necesitas estar logueado." 
        />
      )}
    </div>
  );
};

export default ShowReviews;
