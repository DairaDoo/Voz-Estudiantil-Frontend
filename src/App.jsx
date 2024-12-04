// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ModalProvider } from '@/components/NotLoggedIn/ModalContext';
import Layout from '@/components/Layout/Layout';
import HomePage from '@pages/HomePage/HomePage';
import LoginPage from '@/pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import EventPage from '@pages/EventsPage/EventsPage';
import ReviewsPage from './components/ShowReviews/ShowReviews';
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <ModalProvider>  {/* Provee el contexto para todos los componentes */}
      <Router>
        <Routes>
          {/* Rutas que deben estar dentro del Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/professors" element={<h1>Future Professors Section</h1>} />
            <Route path="/events" element={<EventPage />} />
          </Route>

          {/* Rutas fuera del Layout */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reviews" element={<ReviewsPage />} />
        </Routes>
      </Router>
    </ModalProvider>
  );
}

export default App;
