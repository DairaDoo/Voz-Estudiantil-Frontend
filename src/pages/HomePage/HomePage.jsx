import React, { useState } from "react";
import OptionsContainer from "@/components/Contenedor/OptionsContainer";
import ShowReviews from "@/components/ShowReviews/ShowReviews";
import NewPost from "@/components/NewPost/NewPost"; // Botón flotante
import PostReview from "@/components/PostReview/PostReview"; // Formulario emergente

function HomePage() {
  const [showForm, setShowForm] = useState(false);

  // Funciones para manejar el estado del formulario
  const handleNewPostClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div>

      {/* Contenedor de opciones */}
      <OptionsContainer />

      {/* Contenedor de reseñas */}
      <ShowReviews />

      {/* Botón flotante */}
      <NewPost onClick={handleNewPostClick} />

      {/* Formulario emergente */}
      {showForm && <PostReview onClose={handleCloseForm} />}
    </div>
  );
}

export default HomePage;
