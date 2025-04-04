import axios from 'axios';

// This file sets up an Axios instance for making HTTP requests to the backend API
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Base URL for the API
  withCredentials: true, // Include credentials (cookies) with requests
});

export default api;