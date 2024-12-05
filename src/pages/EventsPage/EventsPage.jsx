import React, { useEffect, useState } from "react";
import OptionsContainer from "@/components/OptionsContainer/OptionsContainer";
import NewPost from "@/components/NewPost/NewPost"; // Botón flotante
import PostEvent from "@/components/PostEvent/PostEvent"; // Formulario emergente
import "bootstrap/dist/css/bootstrap.min.css";

function EventPage() {
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  // Cambiar el favicon al cargar la página
  useEffect(() => {
    const favicon = document.querySelector("link[rel='icon']");
    const originalFavicon = favicon.href; // Guardar el favicon original
    favicon.href = "/logo-32x32.png"; // Ruta al favicon desde la carpeta `public`

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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("https://voz-estudiantil-backend.onrender.com/events"); // Cambia la URL si es necesario
        if (!response.ok) throw new Error("Error al obtener los eventos");
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h1 className="text-center mt-4 mb-3">Eventos Universitarios</h1>
      <p className="text-center mb-4">Explora los próximos eventos en tu universidad.</p>

      {/* Contenedor de opciones */}
      <OptionsContainer />

      {/* Botón flotante */}
      <div className="text-center mt-4">
        <NewPost onClick={handleNewPostClick} />
      </div>

      {/* Formulario emergente */}
      {showForm && <PostEvent onClose={handleCloseForm} />}

      {/* Mostrar los eventos */}
      {error && <p className="text-danger text-center">{error}</p>}
      {!events.length && !error && <p className="text-center">Cargando eventos...</p>}

      <div className="row mt-4">
        {events.map((event) => (
          <div key={event.event_id} className="col-12 col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{event.event_title}</h5>
                <p className="card-text">{event.description}</p>

                {/* Mostrar imagen del evento */}
                {event.image_name ? (
                  <div className="d-flex justify-content-center mb-3">
                    <img
                      src={`https://res.cloudinary.com/dzgfxbf16/image/upload/${event.image_name}`}
                      alt="Imagen del evento"
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

                {/* Información adicional */}
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">{new Date(event.create_date).toLocaleDateString()}</small>
                  <small className="text-muted">{event.university_id}</small> {/* Ajusta según los datos que tengas */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventPage;
