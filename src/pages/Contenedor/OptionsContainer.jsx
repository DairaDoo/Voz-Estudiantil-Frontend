import React from 'react';
import './OptionsContainer.css'; // Archivo de estilos
import OptionsContainer from '../../components/OptionsContainer';


const OptionsContainer = () => {
  const options = [
    { id: 1, label: 'Inicio', route: '/inicio' },
    { id: 2, label: 'Departamentos', route: '/departamentos' },
    { id: 3, label: 'Reseñas', route: '/resenas' },
    { id: 4, label: 'Reportes', route: '/reportes' },
  ];

  return (
    <div className="options-container">
      <ul className="options-list">
        {options.map((option) => (
          <li
            key={option.id}
            className="option-item"
            onClick={() => window.location.href = option.route}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OptionsContainer;
