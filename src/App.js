import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import GenerosPage from "./pages/GenerosPage";
import DirectoresPage from "./pages/DirectoresPage";
import ProductorasPage from "./pages/ProductorasPage";
import TiposPage from "./pages/TiposPage";
import MediaPage from "./pages/MediaPage";
import HomePage from "./pages/HomePage";
import './App.css';

function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <li className="nav-item">
      <Link 
        className={`nav-link ${isActive ? 'active fw-bold' : 'text-muted'}`} 
        to={to}
      >
        {children}
      </Link>
    </li>
  );
}

function App() {
  return (
    <Router>
      {/* */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container">
          <Link className="navbar-brand fw-bold text-dark" to="/">
            🎬 Gestor de Medios
          </Link>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <NavLink to="/">Inicio</NavLink>
              <NavLink to="/media">Media</NavLink>
              <NavLink to="/generos">Géneros</NavLink>
              <NavLink to="/directores">Directores</NavLink>
              <NavLink to="/productoras">Productoras</NavLink>
              <NavLink to="/tipos">Tipos</NavLink>
            </ul>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/generos" element={<GenerosPage />} />
          <Route path="/directores" element={<DirectoresPage />} />
          <Route path="/productoras" element={<ProductorasPage />} />
          <Route path="/tipos" element={<TiposPage />} />
          <Route path="/media" element={<MediaPage />} />
        </Routes>
      </main>

      {/* Footer simple */}
      <footer className="bg-light border-top py-3 mt-auto">
        <div className="container text-center text-muted">
          <small>&copy; 2025 Gestor de Películas</small>
        </div>
      </footer>
    </Router>
  );
}

export default App;