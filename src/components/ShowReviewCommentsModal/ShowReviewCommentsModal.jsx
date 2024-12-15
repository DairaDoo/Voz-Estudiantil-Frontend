import React, { useEffect, useState } from "react";

const ShowReviewCommentsModal = ({ reviewId, show, onClose }) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://voz-estudiantil-backend.onrender.com/comments-by-review?review_id=${reviewId}`
      );
      if (!response.ok) throw new Error("Error al obtener los comentarios");
      const data = await response.json();
      setComments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (show && reviewId) {
      fetchComments();
    }
  }, [reviewId, show]);

  const handleCommentSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("No estás autenticado.");
      return;
    }

    let userId;
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      userId = decodedToken.user_id;

      if (!userId) {
        alert("Error al obtener el ID del usuario.");
        return;
      }
    } catch (err) {
      alert("Token inválido. No se pudo decodificar.");
      return;
    }

    if (!newComment.trim()) {
      alert("El comentario no puede estar vacío.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          review_id: reviewId,
          user_id: userId,
          comment: newComment,
        }),
      });

      if (!response.ok) throw new Error("Error al agregar el comentario.");

      setNewComment("");
      await fetchComments();
    } catch (err) {
      alert(err.message);
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: show ? "block" : "none" }}
      tabIndex="-1"
      aria-labelledby="commentsModalLabel"
      aria-hidden="true"
    >
      <div
        className="modal-backdrop fade show" // Asegúrate de incluir el backdrop
        style={{
          backdropFilter: "blur(10px)", // Efecto de difuminado aplicado aquí
          position: "fixed", // Para que cubra todo el fondo
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1, // Asegúrate de que no cubra el contenido del modal
        }}
      ></div>
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        style={{
          backdropFilter: "none", // El fondo está difuminado, no el modal
        }}
      >
        <div
          className="modal-content border-radius-10 shadow-lg"
          style={{
            border: "1px solid #ddd",
            borderRadius: "15px",
          }}
        >
          <div className="modal-header border-bottom-0">
            <h5 className="modal-title" id="commentsModalLabel">
              Comentarios
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
              style={{
                fontSize: "1.5rem",
                color: "#333",
              }}
            ></button>
          </div>
          <div className="modal-body p-3">
            {loading && (
              <div className="text-center py-3">
                <i className="bi bi-arrow-repeat spinner-border"></i> Cargando
                comentarios...
              </div>
            )}
            {error && <p className="text-danger text-center">{error}</p>}
            {!loading && !error && comments.length === 0 && (
              <p className="text-center">No hay comentarios para esta reseña.</p>
            )}
            <ul className="list-unstyled">
              {comments.map((comment) => (
                <li key={comment.comment_id} className="mb-3">
                  <div className="d-flex align-items-start border p-3 rounded-lg shadow-sm bg-light">
                    <div
                      className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center me-3"
                      style={{
                        width: "35px",
                        height: "35px",
                        fontSize: "18px",
                      }}
                    >
                      <i className="bi bi-person-circle"></i>
                    </div>
                    <div className="w-100">
                      <h6
                        className="mb-1"
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#333",
                        }}
                      >
                        {comment.user_name || "Anónimo"}
                      </h6>
                      <p
                        className="mb-0"
                        style={{
                          fontSize: "13px",
                          lineHeight: "1.4",
                          color: "#555",
                        }}
                      >
                        {comment.comment}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="modal-footer border-top-0">
            <textarea
              className="form-control mb-2"
              rows="2"
              placeholder="Escribe tu comentario aquí..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              style={{
                resize: "none",
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            ></textarea>
            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-primary rounded-pill shadow-sm py-2 px-4"
                onClick={handleCommentSubmit}
                style={{
                  fontSize: "13px",
                  padding: "6px 14px",
                  borderRadius: "25px",
                }}
              >
                Comentar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowReviewCommentsModal;
