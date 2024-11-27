// src/pages/HomePage/HomePage.jsx
import React from 'react';
import OptionsContainer from '@/components/Contenedor/OptionsContainer';
import ShowReviews from '@/components/ShowReviews/ShowReviews';

function HomePage() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main page of the application.</p>
      <OptionsContainer/>
      <ShowReviews/>
    </div>
  );
};

export default HomePage;

