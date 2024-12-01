import React, { useEffect, useState } from "react";

const ShowReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:5000/reviews_with_names");
        if (!response.ok) throw new Error("Error al obtener los reviews");
        const data = await response.json();
        // Ordenar las reseñas al principio por la diferencia entre up_vote y down_vote
        data.sort((a, b) => (b.up_vote - b.down_vote) - (a.up_vote - a.down_vote));
        setReviews(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchReviews();
  }, []);

  const handleVote = async (reviewId, type) => {
    try {
      // Enviar una petición PUT al backend para actualizar el voto
      const response = await fetch(`http://localhost:5000/reviews/${reviewId}/votes`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type }), // Enviamos el tipo de voto ('up' o 'down')
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el voto");
      }

      // Actualizar el estado del review con el nuevo voto
      const updatedReviews = reviews.map((review) => {
        if (review.review_id === reviewId) {
          if (type === "up") {
            review.up_vote += 1; // Incrementamos el up_vote
          } else if (type === "down") {
            review.down_vote += 1; // Incrementamos el down_vote
          }
        }
        return review;
      });

      // Ordenar las reseñas por la diferencia entre up_vote y down_vote (de mayor a menor)
      updatedReviews.sort((a, b) => (b.up_vote - b.down_vote) - (a.up_vote - a.down_vote));

      setReviews(updatedReviews); // Actualizamos el estado de las reseñas
    } catch (err) {
      setError(err.message);
    }
  };

  const handleComments = (reviewId) => {
    console.log(`Abrir sección de comentarios para el review ID: ${reviewId}`);
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
                {/* Encabezado con usuario, fecha y contexto académico */}
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
                  {/* Información de universidad y campus */}
                  <div className="text-end">
                    <small className="text-muted" style={{ fontSize: "16px" }}>
                      {review.university_name}
                      {review.campus_name ? ` - ${review.campus_name}` : ""}
                    </small>
                  </div>
                </div>

                {/* Contenido del review */}
                <p className="card-text fs-6">{review.review || "Sin descripción"}</p>

                {/* Imagen del review */}
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

                {/* Sección de acciones */}
                <div className="d-flex justify-content-start align-items-center">
                  <button
                    className="btn btn-outline-primary btn-sm me-2"
                    onClick={() => handleVote(review.review_id, "up")}
                    style={{ fontSize: "17px", padding: "6px 12px" }}
                  >
                    <i className="bi bi-hand-thumbs-up-fill"></i>
                  </button>

                  <span className="fw-bold fs-5 me-2" style={{ fontSize: "17px" }}>
                    {review.up_vote - review.down_vote}
                  </span>

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleVote(review.review_id, "down")}
                    style={{ fontSize: "17px", padding: "6px 12px" }}
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
    </div>
  );
};

export default ShowReviews;
