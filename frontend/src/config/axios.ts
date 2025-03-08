import axios from "axios";

const api = axios.create({
  //create component .env for conexion from data base
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;
