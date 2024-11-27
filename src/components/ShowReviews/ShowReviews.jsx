import React, { useEffect, useState } from "react";
import styles from "./ShowReviews.module.css";

const ShowReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  // Función para obtener los reviews desde el backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:5000/reviews"); // Cambia esta URL si tu backend tiene un prefijo diferente
        if (!response.ok) throw new Error("Error al obtener los reviews");
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchReviews();
  }, []);

  // Función para manejar up_vote y down_vote
  const handleVote = (reviewId, type) => {
    console.log(`${type} vote for review ID: ${reviewId}`);
    // Aquí puedes implementar la lógica para manejar los votos.
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Reseñas</h1>
      {error && <p className={styles.error}>{error}</p>}
      {!reviews.length && !error && <p className={styles.loading}>Cargando reseñas...</p>}

      {reviews.map((review) => (
        <div key={review.review_id} className={styles.reviewCard}>
          {/* Imagen */}
          {review.image_name ? (
            <img
            src={`https://res.cloudinary.com/dzgfxbf16/image/upload/${review.image_name}`}
            alt="Imagen de la reseña"
            className={styles.reviewImage}
          />
          
          ) : (
            <div className={styles.placeholder}>Sin imagen</div>
          )}

          {/* Información */}
          <div className={styles.info}>
            <p className={styles.text}><strong>Review:</strong> {review.review}</p>
            <p className={styles.meta}>
              Creado por: <strong>{review.user_id}</strong> | Universidad: <strong>{review.university_id}</strong> | Fecha:{" "}
              {new Date(review.create_date).toLocaleDateString()}
            </p>
          </div>

          {/* Botones de votación */}
          <div className={styles.voteSection}>
            <button
              className={styles.upVote}
              onClick={() => handleVote(review.review_id, "up")}
            >
              ⬆
            </button>
            <span className={styles.voteCount}>
              {review.up_vote - review.down_vote}
            </span>
            <button
              className={styles.downVote}
              onClick={() => handleVote(review.review_id, "down")}
            >
              ⬇
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowReviews;
