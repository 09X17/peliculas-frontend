import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

const api = axios.create({ baseURL });

export default api;
