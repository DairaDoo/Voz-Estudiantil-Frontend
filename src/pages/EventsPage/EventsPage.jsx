import React, { useState } from "react";
import OptionsContainer from "@/components/Contenedor/OptionsContainer";
import ShowReviews from "@/components/ShowReviews/ShowReviews";
import NewPost from "@/components/NewPost/NewPost"; // Botón flotante
import PostEvent from "@/components/PostEvent/PostEvent"; // Formulario emergente

function EventPage() {
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
      <h1>Eventos Universitarios</h1>
      <p>Explora los próximos eventos en tu universidad.</p>

      {/* Contenedor de opciones */}
      <OptionsContainer />

      {/* Contenedor de eventos */}
      <ShowReviews /> {/* Puedes reemplazarlo con un componente específico para eventos */}

      {/* Botón flotante */}
      <NewPost onClick={handleNewPostClick} />

      {/* Formulario emergente */}
      {showForm && <PostEvent onClose={handleCloseForm} />}
    </div>
  );
}

export default EventPage;
