import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "https://apipeliculas-6end.onrender.com/api";

const api = axios.create({ baseURL });

export default api;

