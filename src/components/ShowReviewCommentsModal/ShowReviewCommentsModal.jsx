import React, { useEffect, useState } from "react";

const ShowReviewCommentsModal = ({ reviewId, show, onClose }) => {
  const [comments, setComments] = useState([]); // Estado para almacenar los comentarios
  const [error, setError] = useState(""); // Estado para manejar errores
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos

  useEffect(() => {
    if (show && reviewId) {
      const fetchComments = async () => {
        try {
          setLoading(true);
          const response = await fetch(`https://voz-estudiantil-backend.onrender.com/comments-by-review?review_id=${reviewId}`);
          if (!response.ok) throw new Error("Error al obtener los comentarios");
          const data = await response.json();
          setComments(data); // Actualizar el estado con los comentarios
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchComments();
    }
  }, [reviewId, show]); // Ejecutar cada vez que cambie el reviewId o show

  const handleCommentClick = () => {
    alert("En proceso de implementación");
  };

  if (!show) return null; // No renderizar el modal si show es falso

  return (
    <div className="modal fade show" style={{ display: show ? "block" : "none" }} tabIndex="-1" aria-labelledby="commentsModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-radius-10 shadow-lg">
          <div className="modal-header border-bottom-0">
            <h5 className="modal-title" id="commentsModalLabel">Comentarios</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body p-4">
            {loading && <div className="text-center py-3"><i className="bi bi-arrow-repeat spinner-border"></i> Cargando comentarios...</div>}
            {error && <p className="text-danger text-center">{error}</p>}
            {!loading && !error && comments.length === 0 && <p className="text-center">No hay comentarios para esta reseña.</p>}
            <ul className="list-unstyled">
              {comments.map((comment) => (
                <li key={comment.comment_id} className="mb-4">
                  <div className="d-flex align-items-start border p-3 rounded-lg shadow-sm bg-light">
                    <div
                      className="rounded-circle bg-dark text-white d-flex justify-content-center align-items-center me-3"
                      style={{ width: "50px", height: "50px", fontSize: "24px" }}
                    >
                      <i className="bi bi-person-circle"></i>
                    </div>
                    <div>
                      <h6 className="mb-2" style={{ fontSize: "18px", fontWeight: "600", color: "#333" }}>
                        {comment.user_name || "Anónimo"}
                      </h6>
                      <p className="mb-0" style={{ fontSize: "14px", lineHeight: "1.6", color: "#555" }}>
                        {comment.comment}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="modal-footer border-top-0 d-flex justify-content-between align-items-center">
            <button type="button" className="btn btn-outline-primary rounded-pill shadow-sm py-2 px-4" onClick={handleCommentClick}>
              Comentar
            </button>
            <button type="button" className="btn btn-secondary rounded-pill shadow-sm py-2 px-4" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowReviewCommentsModal;
