import axios from 'axios';

// This file sets up an Axios instance for making HTTP requests to the backend API
const api = axios.create({
  baseURL: import.meta.env.PROD 
    ? "https://decimetrix-assets.onrender.com/api"
    : "http://localhost:5000/api",
  withCredentials: true,
});

export default api;