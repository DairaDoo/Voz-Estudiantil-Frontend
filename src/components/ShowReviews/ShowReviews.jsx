import React, { useEffect, useState } from "react";
import styles from "./ShowReviews.module.css";

const ShowReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:5000/reviews_with_names");
        if (!response.ok) throw new Error("Error al obtener los reviews");
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchReviews();
  }, []);

  const handleVote = (reviewId, type) => {
    console.log(`${type} vote for review ID: ${reviewId}`);
  };

  const handleComments = (reviewId) => {
    console.log(`Abrir sección de comentarios para el review ID: ${reviewId}`);
  };

  return (
    <div className={`container ${styles.container}`}>
      <h1 className={styles.title}>Reseñas</h1>
      {error && <p className={styles.error}>{error}</p>}
      {!reviews.length && !error && <p className={styles.loading}>Cargando reseñas...</p>}

      {reviews.map((review) => (
        <div key={review.review_id} className={`card mb-4 ${styles.reviewCard}`}>
          <div className="card-body">
            {/* Fecha arriba a la izquierda */}
            <p className={styles.reviewDate}>
              {new Date(review.create_date).toLocaleDateString()}
            </p>

            {/* Título y Nombre del Usuario */}
            <h5 className={styles.reviewTitle}>{review.review_title || "Sin título"}</h5>
            <p className={styles.reviewAuthor}>
              Por: <span>{review.user_name || "Anónimo"}</span>
            </p>

            {/* Imagen */}
            {review.image_name ? (
              <img
                src={`https://res.cloudinary.com/dzgfxbf16/image/upload/${review.image_name}`}
                alt="Imagen de la reseña"
                className={`img-fluid ${styles.reviewImage}`}
              />
            ) : (
              <div className={styles.placeholder}>
                Sin imagen
              </div>
            )}

            {/* Texto del Review */}
            <p className={styles.reviewText}><b>Review: </b>{review.review}</p>

            {/* Botones de Votación */}
            <div className={styles.actionSection}>
              <div className={styles.voteSection}>
                <button
                  className={`${styles.voteButton} ${styles.upVote}`}
                  onClick={() => handleVote(review.review_id, "up")}
                >
                  ⬆
                </button>
                <span className={styles.voteCount}>
                  {review.up_vote - review.down_vote}
                </span>
                <button
                  className={`${styles.voteButton} ${styles.downVote}`}
                  onClick={() => handleVote(review.review_id, "down")}
                >
                  ⬇
                </button>
              </div>
              {/* Botón para comentarios */}
              <button
                className={`${styles.commentButton}`}
                onClick={() => handleComments(review.review_id)}
              >
                Comentarios
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowReviews;
