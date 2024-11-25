// src/pages/HomePage/HomePage.jsx
import React from 'react';
import OptionsContainer from '@/components/OptionsContainer';

const HomePage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '1rem' }}>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main page of the application.</p>
      <OptionsContainer />
    </div>
  );
};

export default HomePage;

