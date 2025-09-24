import { useState } from "react";
import api from "../api";
import Swal from "sweetalert2";

//  Componente para agregar una nueva productora
export default function ProductoraForm({ onAdd }) {
  const [form, setForm] = useState({
    nombre: "",
    slogan: "",
    descripcion: "",
    pais: "",
    estado: true
  });

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/productoras", form);
      Swal.fire("✅ Éxito", "Productora agregada", "success");
      setForm({ nombre: "", slogan: "", descripcion: "", pais: "", estado: true });
      onAdd();
    } catch (error) {
      Swal.fire("❌ Error", error.response?.data?.error || "No se pudo agregar", "error");
    }
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Renderizar el formulario
  return (
    <form onSubmit={handleSubmit} className="mb-4 card p-3">
      <h4>🏢 Agregar Productora</h4>
      <div className="row g-2">
        <div className="col-md-3">
          <input className="form-control" placeholder="Nombre" name="nombre"
            value={form.nombre} onChange={handleChange} required />
        </div>
        <div className="col-md-2">
          <input className="form-control" placeholder="País" name="pais"
            value={form.pais} onChange={handleChange} />
        </div>
        <div className="col-md-3">
          <input className="form-control" placeholder="Slogan" name="slogan"
            value={form.slogan} onChange={handleChange} />
        </div>
        <div className="col-md-3">
          <input className="form-control" placeholder="Descripción" name="descripcion"
            value={form.descripcion} onChange={handleChange} />
        </div>
        <div className="col-md-1">
          <div className="form-check form-switch mt-2">
            <input type="checkbox" name="estado" checked={form.estado} onChange={handleChange}
              className="form-check-input" />
            <label className="form-check-label small">Activo</label>
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary mt-2">Agregar Productora</button>
    </form>
  );
}