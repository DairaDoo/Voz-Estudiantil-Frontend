// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import HomePage from '@pages/HomePage/HomePage';
import LoginPage from '@/pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import ReviewsPage from './components/ShowReviews/ShowReviews';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas que deben estar dentro del Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} /> {/* HomePage se renderiza dentro del Layout */}
          <Route path="/professors" element={<h1>Future Professors Section</h1>} />
          <Route path="/events" element={<h1>Future Events Section</h1>} />
        </Route>

        {/* Rutas fuera del Layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reviews" element={<ReviewsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
