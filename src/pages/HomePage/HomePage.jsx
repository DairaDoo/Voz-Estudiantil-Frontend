import React, { useState, useEffect } from "react";
import OptionsContainer from "@/components/OptionsContainer/OptionsContainer";
import ShowReviews from "@/components/ShowReviews/ShowReviews";
import NewPost from "@/components/NewPost/NewPost"; // Botón flotante
import PostReview from "@/components/PostReview/PostReview"; // Formulario emergente

function HomePage() {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Cambiar el favicon al montar la página
    const favicon = document.querySelector("link[rel='icon']");
    const originalFavicon = favicon.href;
    favicon.href = "/logo-32x32.png"; // Ruta desde la carpeta public

    // Restaurar el favicon original al desmontar el componente
    return () => {
      favicon.href = originalFavicon;
    };
  }, []);

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
