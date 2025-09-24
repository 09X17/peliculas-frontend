import { useState } from "react";
import api from "../api";
import Swal from "sweetalert2";

export default function DirectorForm({ onAdd }) {
  const [form, setForm] = useState({
    nombres: "",
    edad: "",
    nacionalidad: "",
    estado: true
  });


   // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/directores", form);
      Swal.fire("✅ Éxito", "Director agregado", "success");
      setForm({ nombres: "", edad: "", nacionalidad: "", estado: true });
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
      <h4>➕ Agregar Director</h4>
      <div className="row g-2">
        <div className="col-md-4">
          <input
            type="text"
            name="nombres"
            placeholder="Nombres completos"
            value={form.nombres}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            name="edad"
            placeholder="Edad"
            value={form.edad}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            name="nacionalidad"
            placeholder="Nacionalidad"
            value={form.nacionalidad}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="col-md-2">
          <div className="form-check form-switch mt-2">
            <input
              type="checkbox"
              name="estado"
              checked={form.estado}
              onChange={handleChange}
              className="form-check-input"
            />
            <label className="form-check-label small">Activo</label>
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary mt-2">Agregar Director</button>
    </form>
  );
}