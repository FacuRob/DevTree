import axios from "axios";

const api = axios.create({
  //create component .env for conexion from data base
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  //realiza una intercepcion, enviando los datos del usuario que inicia session
  const token = localStorage.getItem("AUTH_TOKEN");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
