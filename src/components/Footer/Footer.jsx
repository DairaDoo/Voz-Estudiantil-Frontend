// src/components/Footer/Footer.jsx
import React from 'react';
import styles from './Footer.module.css'; // Importa como un objeto

const Footer = () => (
  <footer className={styles.footer}>
    <p>&copy; {new Date().getFullYear()} Voz Estudiantil </p>
  </footer>
);

export default Footer;
