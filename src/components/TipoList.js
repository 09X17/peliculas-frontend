import { useEffect, useState } from "react";
import api from "../api";
import Swal from "sweetalert2";

// Componente para listar y gestionar tipos de media
export default function TipoList() {
  const [tipos, setTipos] = useState([]);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({ nombre: "", descripcion: "", estado: true });

  // Cargar tipos
  const fetchTipos = async () => {
    try {
      const res = await api.get("/tipos");
      setTipos(res.data.data);
    } catch (err) {
      console.error("❌ Error al cargar tipos:", err);
    }
  };

  useEffect(() => {
    fetchTipos();
  }, []);

  // Preparar edición
  const editarTipo = (tipo) => {
    setEditando(tipo._id);
    setForm({ nombre: tipo.nombre, descripcion: tipo.descripcion, estado: tipo.estado });
  };

  // Guardar edición
  const guardarEdicion = async (id) => {
    try {
      await api.put(`/tipos/${id}`, form);
      setEditando(null);
      Swal.fire("✅ Éxito", "Tipo actualizado", "success");
      fetchTipos();
    } catch (err) {
      Swal.fire("❌ Error", "No se pudo actualizar", "error");
    }
  };

  // Eliminar tipo
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });

    if (confirm.isConfirmed) {
      try {
        await api.delete(`/tipos/${id}`);
        Swal.fire("✅ Eliminado", "Tipo eliminado", "success");
        fetchTipos();
      } catch (err) {
        Swal.fire("❌ Error", "No se pudo eliminar", "error");
      }
    }
  };

  // Renderizar la tabla de tipos
  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5>📋 Lista de Tipos</h5>
      </div>
      <div className="card-body table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tipos.map((t) => (
              <tr key={t._id}>
                <td>
                  {editando === t._id ? (
                    <input
                      type="text"
                      value={form.nombre}
                      onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                      className="form-control form-control-sm"
                    />
                  ) : (
                    t.nombre
                  )}
                </td>
                <td>
                  {editando === t._id ? (
                    <input
                      type="text"
                      value={form.descripcion}
                      onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                      className="form-control form-control-sm"
                    />
                  ) : (
                    t.descripcion || "-"
                  )}
                </td>
                <td>
                  {editando === t._id ? (
                    <select
                      className="form-select form-select-sm"
                      value={form.estado}
                      onChange={(e) => setForm({ ...form, estado: e.target.value === "true" })}
                    >
                      <option value={true}>Activo ✅</option>
                      <option value={false}>Inactivo ❌</option>
                    </select>
                  ) : (
                    <span className={`badge ${t.estado ? "bg-success" : "bg-secondary"}`}>
                      {t.estado ? "Activo ✅" : "Inactivo ❌"}
                    </span>
                  )}
                </td>
                <td>
                  {editando === t._id ? (
                    <>
                      <button
                        className="btn btn-success btn-sm me-1"
                        onClick={() => guardarEdicion(t._id)}
                      >
                        💾
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setEditando(null)}
                      >
                        ❌
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-warning btn-sm me-1"
                        onClick={() => editarTipo(t)}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(t._id)}
                      >
                        🗑️
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {tipos.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center">
                  No hay tipos disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
