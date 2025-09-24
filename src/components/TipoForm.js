import { useState } from "react";
import api from "../api";
import Swal from "sweetalert2";

// Componente para agregar un nuevo tipo de media
export default function TipoForm({ onAdd }) {
  const [form, setForm] = useState({ nombre: "", descripcion: "" });

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/tipos", form);
      Swal.fire("✅ Éxito", "Tipo agregado", "success");
      setForm({ nombre: "", descripcion: "" });
      onAdd(res.data.data); 
    } catch (err) {
      console.error("❌ Error al agregar tipo:", err.response?.data || err.message);
      Swal.fire("❌ Error", "No se pudo agregar", "error");
    }
  };

  // Renderizar el formulario
  return (
    <form onSubmit={handleSubmit} className="mb-4 card p-3">
      <h4>📌 Agregar Tipo</h4>
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          name="nombre"
          className="form-control"
          value={form.nombre}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <input
          type="text"
          name="descripcion"
          className="form-control"
          value={form.descripcion}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Agregar
      </button>
    </form>
  );
}
