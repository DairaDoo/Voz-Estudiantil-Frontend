import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import HomePage from '@/pages/HomePage/HomePage';
import LoginPage from '@/pages/Login/Login';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas que deben estar dentro del Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/professors" element={<h1>Future Professors Section</h1>} />
          <Route path="/events" element={<h1>Future Events Section</h1>} />
        </Route>

        {/* Ruta de login fuera del Layout */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
