import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
export const api = (token) => axios.create({
    baseURL: API_URL,
    headers: token ? { Authorization: `Bearer ${token}` } : {}
});

