import React from "react";
import styles from "./NewPost.module.css";

function NewPost({ onClick }) {
  return (
    <button
      className={`${styles.floatingButton} rounded-circle position-fixed d-flex align-items-center justify-content-center`}
      style={{
        width: "56px",
        height: "56px",
        bottom: "16px",
        right: "16px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
      }}
      onClick={onClick}
      aria-label="Añadir reseña"
    >
      <i className="bi bi-plus" style={{ color: "white", fontSize: "50px" }}></i>
    </button>
  );
}

export default NewPost;
