import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">🎬 Películas App</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><Link className="nav-link" to="/generos">Géneros</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/directores">Directores</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/productoras">Productoras</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/tipos">Tipos</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/media">Media</Link></li>
        </ul>
      </div>
    </nav>
  );
}
