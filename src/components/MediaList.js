import { useEffect, useState } from "react";
import api from "../api";
import Swal from "sweetalert2";


// Componente para listar y gestionar películas y series
export default function MediaList() {
  const [medias, setMedias] = useState([]);
  const [editando, setEditando] = useState(null);
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

  // Cargar medias desde la API
  const fetchMedias = async () => {
    try {
      const res = await api.get("/media");
      setMedias(res.data.data);
    } catch (error) {
      console.error("❌ Error al cargar medias:", error);
    }
  };

  useEffect(() => {
    fetchMedias();
  }, []);

  // Eliminar media
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true
    });

    if (confirm.isConfirmed) {
      try {
        await api.delete(`/media/${id}`);
        Swal.fire("✅ Eliminado", "Media eliminada", "success");
        fetchMedias();
      } catch {
        Swal.fire("❌ Error", "No se pudo eliminar", "error");
      }
    }
  };

  // Preparar edición
  const editarMedia = (media) => {
    setEditando(media._id);
    setForm({
      serial: media.serial,
      titulo: media.titulo,
      sinopsis: media.sinopsis,
      anioEstreno: media.anioEstreno || "",
      url: media.url,
      imagenPortada: media.imagenPortada || "",
      genero: media.genero?._id || "",
      director: media.director?._id || "",
      productora: media.productora?._id || "",
      tipo: media.tipo?._id || ""
    });
  };

  // Guardar edición
  const guardarEdicion = async (id) => {
    try {
      await api.put(`/media/${id}`, form);
      setEditando(null);
      fetchMedias();
      Swal.fire("✅ Actualizado", "Media actualizada", "success");
    } catch (error) {
      Swal.fire("❌ Error", "No se pudo actualizar", "error");
    }
  };

  // Renderizar la tabla de medias
  return (
    <div className="card">
      <div className="card-header">
        <h5>🎞️ Lista de Películas/Series</h5>
      </div>
      <div className="card-body table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Título</th>
              <th>Año</th>
              <th>Género</th>
              <th>Director</th>
              <th>Productora</th>
              <th>Tipo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {medias.map((m) => (
              <tr key={m._id}>
                <td>
                  {editando === m._id ? (
                    <input
                      type="text"
                      value={form.serial}
                      onChange={(e) => setForm({ ...form, serial: e.target.value })}
                      className="form-control form-control-sm"
                    />
                  ) : (
                    m.serial
                  )}
                </td>
                <td>
                  {editando === m._id ? (
                    <input
                      type="text"
                      value={form.titulo}
                      onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                      className="form-control form-control-sm"
                    />
                  ) : (
                    m.titulo
                  )}
                </td>
                <td>
                  {editando === m._id ? (
                    <input
                      type="number"
                      value={form.anioEstreno}
                      onChange={(e) => setForm({ ...form, anioEstreno: e.target.value })}
                      className="form-control form-control-sm"
                    />
                  ) : (
                    m.anioEstreno || "-"
                  )}
                </td>
                <td>{m.genero?.nombre || "-"}</td>
                <td>{m.director?.nombres || "-"}</td>
                <td>{m.productora?.nombre || "-"}</td>
                <td>{m.tipo?.nombre || "-"}</td>
                <td>
                  {editando === m._id ? (
                    <>
                      <button className="btn btn-success btn-sm me-1" onClick={() => guardarEdicion(m._id)}>💾</button>
                      <button className="btn btn-secondary btn-sm" onClick={() => setEditando(null)}>❌</button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-warning btn-sm me-1" onClick={() => editarMedia(m)}>✏️</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(m._id)}>🗑️</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {medias.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center">No hay medias disponibles.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
