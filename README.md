# Gestor de Películas

📽️ **Gestor de Películas** es una aplicación web para administrar películas, series, géneros y tipos.  
Permite agregar, editar y eliminar elementos, con listas dinámicas y formularios amigables usando React, Axios y SweetAlert.

---

## Características

- CRUD completo para:
  - **Media:** Películas y series.
  - **Géneros:** Nombre, descripción y estado (activo/inactivo).
  - **Tipos:** Nombre, descripción y estado.
- Formularios interactivos con validación básica.
- Listados con edición en línea y eliminación con confirmación.
- Estado de elementos (activo/inactivo) visible con badges.
- Estilo consistente con **Bootstrap**.

---

## Tecnologías

- **Frontend:** React, Bootstrap, SweetAlert2.
- **Backend:** API REST (puede ser Node.js + Express + MongoDB).
- **HTTP:** Axios para comunicación con la API.

---

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/09X17/peliculas-frontend.git
cd peliculas-frontend
````

2. Instala dependencias:

```bash
npm install
```

3. Configura la URL de tu API en `src/api.js`:

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api" 
});

export default api;
```

4. Inicia la aplicación:

```bash
npm start
```

La app estará disponible en `http://localhost:3000`.

---

## Estructura del proyecto

```
src/
├─ components/
│  ├─ MediaForm.js
│  ├─ MediaList.js
│  ├─ GeneroForm.js
│  ├─ GeneroList.js
│  ├─ TipoForm.js
│  ├─ TipoList.js
├─ api.js
├─ App.js
└─ index.js
```

* `Form.js`: Formularios para agregar elementos.
* `List.js`: Listas para mostrar, editar y eliminar elementos.
* `api.js`: Configuración de Axios.

---

## Uso

1. **Agregar elementos:**
   Completa el formulario y haz clic en "Agregar".
   La lista se actualizará automáticamente.

2. **Editar elementos:**
   Haz clic en ✏️ para editar un elemento, modifica los campos y guarda 💾.

3. **Eliminar elementos:**
   Haz clic en 🗑️ y confirma la eliminación.

---

## Licencia

MIT © 2025
Desarrollado por \[Nicolás Campillo C]

---
