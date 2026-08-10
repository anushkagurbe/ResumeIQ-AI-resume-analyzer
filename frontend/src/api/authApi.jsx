import axios from "axios";

export let AUTH_API = axios.create({
    baseURL: import.meta.env.VITE_AUTH_API_URL,
    withCredentials: true
});