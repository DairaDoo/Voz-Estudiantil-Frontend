import React from "react";

function NewPost({ onClick }) {
  return (
    <button
      className="btn btn-primary rounded-circle position-fixed d-flex align-items-center justify-content-center"
      style={{
        width: "56px",
        height: "56px",
        bottom: "16px",
        right: "16px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        fontSize: "24px",
      }}
      onClick={onClick}
      aria-label="Añadir reseña"
    >
      ➕
    </button>
  );
}

export default NewPost;
