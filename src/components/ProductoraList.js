import { useEffect, useState } from "react";
import api from "../api";
import Swal from "sweetalert2";

// Componente para listar y gestionar productoras
export default function ProductoraList() {
  const [productoras, setProductoras] = useState([]);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({ nombre: "", slogan: "", descripcion: "", pais: "", estado: true });

  // Cargar productoras desde la API
  const fetchProductoras = async () => {
    try {
      const res = await api.get("/productoras");
      setProductoras(res.data.data);
    } catch (err) {
      console.error("❌ Error al cargar productoras:", err);
    }
  };

  // Eliminar productora
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      icon: "warning",
      showCancelButton: true
    });

    if (confirm.isConfirmed) {
      try {
        await api.delete(`/productoras/${id}`);
        Swal.fire("✅ Eliminada", "Productora eliminada", "success");
        fetchProductoras();
      } catch {
        Swal.fire("❌ Error", "No se pudo eliminar", "error");
      }
    }
  };

  // Preparar edición
  const editarProductora = (productora) => {
    setEditando(productora._id);
    setForm({
      nombre: productora.nombre,
      slogan: productora.slogan || "",
      descripcion: productora.descripcion || "",
      pais: productora.pais || "",
      estado: productora.estado
    });
  };

  // Guardar edición
  const guardarEdicion = async (id) => {
    try {
      await api.put(`/productoras/${id}`, form);
      setEditando(null);
      fetchProductoras();
      Swal.fire("✅ Actualizada", "Productora actualizada", "success");
    } catch (error) {
      Swal.fire("❌ Error", "No se pudo actualizar", "error");
    }
  };

  useEffect(() => { fetchProductoras(); }, []);

  // Renderizar la tabla de productoras
  return (
    <div className="card">
      <div className="card-header">
        <h5>🏢 Lista de Productoras</h5>
      </div>
      <div className="card-body">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>País</th>
              <th>Slogan</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productoras.map((p) => (
              <tr key={p._id}>
                <td>
                  {editando === p._id ? (
                    <input value={form.nombre} onChange={(e) => setForm({...form, nombre: e.target.value})}
                      className="form-control form-control-sm" />
                  ) : (p.nombre)}
                </td>
                <td>
                  {editando === p._id ? (
                    <input value={form.pais} onChange={(e) => setForm({...form, pais: e.target.value})}
                      className="form-control form-control-sm" />
                  ) : (p.pais || "-")}
                </td>
                <td>
                  {editando === p._id ? (
                    <input value={form.slogan} onChange={(e) => setForm({...form, slogan: e.target.value})}
                      className="form-control form-control-sm" />
                  ) : (p.slogan || "-")}
                </td>
                <td>
                  {editando === p._id ? (
                    <input value={form.descripcion} onChange={(e) => setForm({...form, descripcion: e.target.value})}
                      className="form-control form-control-sm" />
                  ) : (p.descripcion || "-")}
                </td>
                <td>
                  {editando === p._id ? (
                    <select value={form.estado} onChange={(e) => setForm({...form, estado: e.target.value === 'true'})}
                      className="form-control form-control-sm">
                      <option value={true}>Activo</option>
                      <option value={false}>Inactivo</option>
                    </select>
                  ) : (
                    <span className={`badge ${p.estado ? 'bg-success' : 'bg-secondary'}`}>
                      {p.estado ? "Activo" : "Inactivo"}
                    </span>
                  )}
                </td>
                <td>
                  {editando === p._id ? (
                    <>
                      <button className="btn btn-success btn-sm me-1" onClick={() => guardarEdicion(p._id)}>💾</button>
                      <button className="btn btn-secondary btn-sm" onClick={() => setEditando(null)}>❌</button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-warning btn-sm me-1" onClick={() => editarProductora(p)}>✏️</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p._id)}>🗑️</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}