// src/pages/HomePage/HomePage.jsx
import React from 'react';
import OptionsContainer from '@/components/Contenedor/OptionsContainer';
import NewPost from '@/components/NewPost/NewPost';

function HomePage() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main page of the application.</p>
      <NewPost></NewPost>
    </div>
    
  );
};

export default HomePage;

