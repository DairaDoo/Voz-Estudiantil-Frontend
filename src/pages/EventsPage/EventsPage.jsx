import React, { useEffect, useState } from "react";
import NewPost from "@/components/NewPost/NewPost"; // Botón flotante
import PostEvent from "@/components/PostEvent/PostEvent"; // Formulario emergente
import styles from "./EventsPage.module.css"; // Importa los estilos del módulo CSS

function EventPage() {
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [expandedEventId, setExpandedEventId] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/events");
        if (!response.ok) throw new Error("Error al obtener los eventos");
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEvents();
  }, []);

  const handleExpandText = (eventId) => {
    setExpandedEventId((prevId) => (prevId === eventId ? null : eventId)); // Toggle expand
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className="text-center mt-4 mb-3">Eventos Universitarios</h1>
      <p className="text-center mb-4">Explora los próximos eventos en tu universidad.</p>

      {/* Botón flotante */}
      <div className={styles.floatingButtonContainer}>
        <NewPost onClick={() => setShowForm(true)} />
      </div>

      {/* Formulario emergente */}
      {showForm && <PostEvent onClose={() => setShowForm(false)} />}

      {/* Mostrar los eventos */}
      {error && <p className="text-danger text-center">{error}</p>}
      {!events.length && !error && <p className="text-center">Cargando eventos...</p>}

      <div className="row mt-4">
        {events.map((event) => (
          <div key={event.event_id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className={styles.card}>
              <div className={styles.cardBody}>
                <h5 className={styles.cardTitle}>{event.event_title}</h5>

                {/* Descripción con la opción de expandir */}
                <div className={styles.cardTextContainer}>
                  <p
                    className={`${styles.cardText} ${
                      expandedEventId === event.event_id ? styles.expandable : ""
                    }`}
                  >
                    {event.description}
                  </p>
                </div>

                {/* Botón de "Ver más/Ver menos" */}
                {event.description.length > 200 && (
                  <button
                    className={`${styles.expandButton} btn btn-link p-1 ${
                      expandedEventId === event.event_id ? styles.expanded : ""
                    }`}
                    onClick={() => handleExpandText(event.event_id)}
                  >
                    {expandedEventId === event.event_id ? "Ver menos" : "Ver más"}
                  </button>
                )}

                {/* Mostrar imagen del evento */}
                {event.image_name ? (
                  <div className="d-flex justify-content-center mb-4">
                    <img
                      src={`https://res.cloudinary.com/dzgfxbf16/image/upload/${event.image_name}`}
                      alt="Imagen del evento"
                      className={`img-fluid rounded mb-2 ${styles.cardImage}`}
                    />
                  </div>
                ) : (
                  <div className={styles.noImageContainer}>
                    <small className="text-muted">Sin imagen</small>
                  </div>
                )}

                {/* Información adicional */}
                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <small className="text-muted">
                    {new Date(event.create_date).toLocaleDateString()}
                  </small>
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
