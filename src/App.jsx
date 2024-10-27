import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Aquí se pasan en elements los componentes con las páginas que se mostrarán en cada sección */}
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/professors' element={<h1>Future Professors Section</h1>}></Route>
          <Route path='/events' element={<h1>Future Events Section</h1>}></Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
