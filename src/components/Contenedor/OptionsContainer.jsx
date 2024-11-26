import React from 'react';
import styles from '@/components/Contenedor/OptionsContainer.module.css';


const OptionsContainer = () => {
  const options = [
    { id: 1, label: 'Home', route: '/' },
    { id: 2, label: 'Professors', route: '/professors' },
    { id: 3, label: 'Events', route: '/events' },
    { id: 4, label: 'Login', route: '/login' },
  ];

  return (
    <div className={`btn w-100 ${styles.options_container}`}>
      <ul className={`${styles.option_list}`}>
        {options.map((option) => (
          <li
            key={option.id}
            className={`btn w-100 ${styles.option_item}`}
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
