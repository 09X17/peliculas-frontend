import { useEffect, useState } from "react";
import api from "../api";
import Swal from "sweetalert2";

// Componente para agregar una nueva película o serie
export default function MediaForm({ onAdd }) {
  const [form, setForm] = useState({
    serial: "",
    titulo: "",
    sinopsis: "",
    anioEstreno: "",
    url: "",
    imagenPortada: "",
    genero: "",
    director: "",
    productora: "",
    tipo: ""
  });

  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);

  // Cargar elementos activos
  useEffect(() => {
    api.get("/generos/activos").then(res => setGeneros(res.data.data));
    api.get("/directores/activos").then(res => setDirectores(res.data.data));
    api.get("/productoras").then(res => setProductoras(res.data.data.filter(p => p.estado)));
    api.get("/tipos").then(res => setTipos(res.data.data));
  }, []);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/media", form);
      Swal.fire("✅ Éxito", "Media agregada", "success");
      setForm({
        serial: "",
        titulo: "",
        sinopsis: "",
        anioEstreno: "",
        url: "",
        imagenPortada: "",
        genero: "",
        director: "",
        productora: "",
        tipo: ""
      });
      onAdd();
    } catch (error) {
      Swal.fire("❌ Error", error.response?.data?.error || "No se pudo agregar", "error");
    }
  };

  // Renderizar el formulario
  return (
    <form onSubmit={handleSubmit} className="mb-4 card p-3">
      <h4>🎬 Agregar Película/Serie</h4>

      <div className="row g-2">
        <div className="col-md-3">
          <input
            name="serial"
            placeholder="Serial único"
            value={form.serial}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-5">
          <input
            name="titulo"
            placeholder="Título"
            value={form.titulo}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            name="anioEstreno"
            placeholder="Año estreno"
            value={form.anioEstreno}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-md-2">
          <input
            name="url"
            placeholder="URL"
            value={form.url}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
      </div>

      <div className="row g-2 mt-2">
        <div className="col-md-12">
          <textarea
            name="sinopsis"
            placeholder="Sinopsis"
            value={form.sinopsis}
            onChange={handleChange}
            className="form-control"
            rows="2"
          />
        </div>
      </div>

      <div className="row g-2 mt-2">
        <div className="col-md-3">
          <select
            name="genero"
            value={form.genero}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Género (activos)</option>
            {generos.map(g => (
              <option key={g._id} value={g._id}>{g.nombre}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select
            name="director"
            value={form.director}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Director (activos)</option>
            {directores.map(d => (
              <option key={d._id} value={d._id}>{d.nombres}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select
            name="productora"
            value={form.productora}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Productora (activas)</option>
            {productoras.map(p => (
              <option key={p._id} value={p._id}>{p.nombre}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Tipo</option>
            {tipos.map(t => (
              <option key={t._id} value={t._id}>{t.nombre}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="row g-2 mt-2">
        <div className="col-md-12">
          <input
            name="imagenPortada"
            placeholder="URL de imagen de portada"
            value={form.imagenPortada}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary mt-3">
        Agregar Media
      </button>
    </form>
  );
}
