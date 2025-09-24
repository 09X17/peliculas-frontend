import { useEffect, useState } from "react";
import api from "../api";
import Swal from "sweetalert2";

// Componente para listar y gestionar géneros
export default function GeneroList() {
  const [generos, setGeneros] = useState([]);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({ nombre: "", descripcion: "", estado: true });

  // Cargar géneros
  const cargarGeneros = async () => {
    try {
      const res = await api.get("/generos");
      setGeneros(res.data.data);
    } catch (err) {
      console.error("❌ Error al cargar géneros:", err);
    }
  };

  useEffect(() => {
    cargarGeneros();
  }, []);

  // Eliminar género
  const eliminarGenero = async (id) => {
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
        await api.delete(`/generos/${id}`);
        Swal.fire("✅ Eliminado", "El género fue eliminado", "success");
        cargarGeneros();
      } catch (err) {
        Swal.fire("❌ Error", "No se pudo eliminar", "error");
      }
    }
  };

  // Preparar edición
  const editarGenero = (genero) => {
    setEditando(genero._id);
    setForm({ nombre: genero.nombre, descripcion: genero.descripcion, estado: genero.estado });
  };

  // Guardar edición
  const guardarEdicion = async (id) => {
    try {
      await api.put(`/generos/${id}`, form);
      setEditando(null);
      Swal.fire("✅ Éxito", "Género actualizado", "success");
      cargarGeneros();
    } catch (err) {
      Swal.fire("❌ Error", "No se pudo actualizar", "error");
    }
  };

  // Renderizar la tabla de géneros
  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5>📋 Lista de Géneros</h5>
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
            {generos.map((g) => (
              <tr key={g._id}>
                <td>
                  {editando === g._id ? (
                    <input
                      type="text"
                      value={form.nombre}
                      onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                      className="form-control form-control-sm"
                    />
                  ) : (
                    g.nombre
                  )}
                </td>
                <td>
                  {editando === g._id ? (
                    <input
                      type="text"
                      value={form.descripcion}
                      onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                      className="form-control form-control-sm"
                    />
                  ) : (
                    g.descripcion || "-"
                  )}
                </td>
                <td>
                  {editando === g._id ? (
                    <select
                      className="form-select form-select-sm"
                      value={form.estado}
                      onChange={(e) => setForm({ ...form, estado: e.target.value === "true" })}
                    >
                      <option value={true}>Activo</option>
                      <option value={false}>Inactivo ❌</option>
                    </select>
                  ) : (
                    <span className={`badge ${g.estado ? "bg-success" : "bg-secondary"}`}>
                      {g.estado ? "Activo" : "Inactivo ❌"}
                    </span>
                  )}
                </td>
                <td>
                  {editando === g._id ? (
                    <>
                      <button
                        className="btn btn-success btn-sm me-1"
                        onClick={() => guardarEdicion(g._id)}
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
                        onClick={() => editarGenero(g)}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => eliminarGenero(g._id)}
                      >
                        🗑️
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {generos.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center">
                  No hay géneros disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
