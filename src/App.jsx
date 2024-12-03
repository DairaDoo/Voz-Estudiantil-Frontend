// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ModalProvider } from "@/components/NotLoggedIn/ModalContext";
import Layout from "@/components/Layout/Layout";
import HomePage from "@pages/HomePage/HomePage";
import LoginPage from "@/pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import ReviewsPage from "./components/ShowReviews/ShowReviews";
import NewPost from "@/components/NewPost/NewPost"; // Botón flotante
import ReviewForm from "@/components/PostReview/PostReview"; // Formulario emergente
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [showForm, setShowForm] = useState(false);

  // Funciones para manejar el estado del formulario
  const handleNewPostClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <ModalProvider> {/* Provee el contexto para todos los componentes */}
      <Router>
        <Routes>
          {/* Rutas dentro del Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/professors" element={<h1>Future Professors Section</h1>} />
            <Route path="/events" element={<h1>Future Events Section</h1>} />
          </Route>

          {/* Rutas fuera del Layout */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reviews" element={<ReviewsPage />} />
        </Routes>
      </Router>

      {/* Botón flotante para nueva reseña */}
      <NewPost onClick={handleNewPostClick} />

      {/* Formulario emergente */}
      {showForm && <ReviewForm onClose={handleCloseForm} />}
    </ModalProvider>
  );
}

export default App;
