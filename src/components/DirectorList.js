import { useEffect, useState } from "react";
import api from "../api";
import Swal from "sweetalert2";

// Componente para listar y gestionar directores
export default function DirectorList() {
  const [directores, setDirectores] = useState([]);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({ nombres: "", edad: "", nacionalidad: "", estado: true });


  // Cargar directores desde la API
  const fetchDirectores = async () => {
    try {
      const res = await api.get("/directores");
      setDirectores(res.data.data);
    } catch (error) {
      console.error("❌ Error al cargar directores:", error);
    }
  };

  // Eliminar director
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true
    });

    if (confirm.isConfirmed) {
      try {
        await api.delete(`/directores/${id}`);
        Swal.fire("✅ Eliminado", "Director eliminado", "success");
        fetchDirectores();
      } catch {
        Swal.fire("❌ Error", "No se pudo eliminar", "error");
      }
    }
  };

  // Preparar edición
  const editarDirector = (director) => {
    setEditando(director._id);
    setForm({
      nombres: director.nombres,
      edad: director.edad || "",
      nacionalidad: director.nacionalidad || "",
      estado: director.estado
    });
  };

  // Guardar edición
  const guardarEdicion = async (id) => {
    try {
      await api.put(`/directores/${id}`, form);
      setEditando(null);
      fetchDirectores();
      Swal.fire("✅ Actualizado", "Director actualizado", "success");
    } catch (error) {
      Swal.fire("❌ Error", "No se pudo actualizar", "error");
    }
  };

  useEffect(() => { fetchDirectores(); }, []);


  // Renderizar la tabla de directores
  return (
    <div className="card">
      <div className="card-header">
        <h5>📋 Lista de Directores</h5>
      </div>
      <div className="card-body">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombres</th>
              <th>Edad</th>
              <th>Nacionalidad</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {directores.map((d) => (
              <tr key={d._id}>
                <td>
                  {editando === d._id ? (
                    <input
                      type="text"
                      value={form.nombres}
                      onChange={(e) => setForm({ ...form, nombres: e.target.value })}
                      className="form-control form-control-sm"
                    />
                  ) : (
                    d.nombres
                  )}
                </td>
                <td>
                  {editando === d._id ? (
                    <input
                      type="number"
                      value={form.edad}
                      onChange={(e) => setForm({ ...form, edad: e.target.value })}
                      className="form-control form-control-sm"
                    />
                  ) : (
                    d.edad || "-"
                  )}
                </td>
                <td>
                  {editando === d._id ? (
                    <input
                      type="text"
                      value={form.nacionalidad}
                      onChange={(e) => setForm({ ...form, nacionalidad: e.target.value })}
                      className="form-control form-control-sm"
                    />
                  ) : (
                    d.nacionalidad || "-"
                  )}
                </td>
                <td>
                  {editando === d._id ? (
                    <select
                      value={form.estado}
                      onChange={(e) => setForm({ ...form, estado: e.target.value === 'true' })}
                      className="form-control form-control-sm"
                    >
                      <option value={true}>Activo</option>
                      <option value={false}>Inactivo</option>
                    </select>
                  ) : (
                    <span className={`badge ${d.estado ? 'bg-success' : 'bg-secondary'}`}>
                      {d.estado ? "Activo" : "Inactivo"}
                    </span>
                  )}
                </td>
                <td>
                  {editando === d._id ? (
                    <>
                      <button className="btn btn-success btn-sm me-1" onClick={() => guardarEdicion(d._id)}>
                        💾
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={() => setEditando(null)}>
                        ❌
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-warning btn-sm me-1" onClick={() => editarDirector(d)}>
                        ✏️
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(d._id)}>
                        🗑️
                      </button>
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