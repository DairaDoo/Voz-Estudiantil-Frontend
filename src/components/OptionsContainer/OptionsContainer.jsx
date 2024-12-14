import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Usamos el hook useNavigate para navegación en React Router
import { FaBars, FaTimes } from 'react-icons/fa'; // Usamos iconos de react-icons para las flechas
import styles from '@/components/OptionsContainer/OptionsContainer.module.css'; // Asegúrate de importar los estilos

const OptionsContainer = () => {
  const [isOpen, setIsOpen] = useState(false); // El menú está cerrado por defecto
  const navigate = useNavigate(); // Usamos el hook para navegación

  const options = [
    { id: 1, label: 'Reseñas', route: '/' },
    { id: 2, label: 'Profesores', route: '/professors' },
    { id: 3, label: 'Eventos', route: '/events' },
  ];

  const handleClickOption = (route) => {
    navigate(route); // Usamos navigate en lugar de window.location.href
    if (isOpen) setIsOpen(false); // Cierra el menú después de hacer click si está abierto
  };

  return (
    <div>
      {/* Botón de abrir/cerrar - Siempre visible */}
      <button
        className={`${styles.toggle_button} btn btn-light`} // Botón con clase de Bootstrap
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />} {/* Usamos iconos de react-icons */}
      </button>

      {/* Contenedor de opciones */}
      <div className={`${styles.options_container} ${isOpen ? styles.open : ''}`}>
        <div className={styles.overlay} /> {/* Superpone un fondo oscuro translúcido */}

        {/* Rectángulo centrado con contenido */}
        <div className={styles.rectangle}>
          <ul className={styles.option_list}>
            {options.map((option) => (
              <li
                key={option.id}
                className={styles.option_item}
                onClick={() => handleClickOption(option.route)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OptionsContainer;
