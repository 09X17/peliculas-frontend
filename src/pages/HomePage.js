import { Link } from "react-router-dom";

export default function HomePage() {
  const modules = [
    {
      title: "🎬 Media",
      description: "Gestiona tu colección de películas y series",
      link: "/media",
      color: "border-start border-primary"
    },
    {
      title: "📚 Géneros",
      description: "Administra los géneros cinematográficos",
      link: "/generos",
      color: "border-start border-success"
    },
    {
      title: "👨‍💼 Directores",
      description: "Gestiona directores y realizadores",
      link: "/directores",
      color: "border-start border-info"
    },
    {
      title: "🏢 Productoras",
      description: "Administra estudios productores",
      link: "/productoras",
      color: "border-start border-warning"
    },
    {
      title: "📋 Tipos",
      description: "Gestiona tipos de contenido",
      link: "/tipos",
      color: "border-start border-secondary"
    }
  ];

  return (
    <div>
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold mb-3">Gestor de Medios</h1>
        <p className="lead text-muted">Sistema simple para gestionar tu colección audiovisual</p>
      </div>

      <div className="row g-4">
        {modules.map((module, index) => (
          <div key={index} className="col-md-6 col-lg-4">
            <div className={`card h-100 ${module.color} border-start-4`}>
              <div className="card-body">
                <h5 className="card-title">{module.title}</h5>
                <p className="card-text text-muted">{module.description}</p>
                <Link to={module.link} className="btn btn-outline-primary btn-sm">
                  Ir al módulo →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row mt-5">
        <div className="col-12">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">🚀 Comienza a gestionar</h5>
              <p className="card-text text-muted">
                Selecciona un módulo del menú superior o de las tarjetas para empezar
              </p>
              <Link to="/media" className="btn btn-primary">
                Ver Media
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}