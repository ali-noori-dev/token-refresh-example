import axios, { AxiosInstance } from "axios";
import { setupInterceptors } from "./interceptors";

const baseURL = import.meta.env.VITE_API_BASE_URI;

export const api: AxiosInstance = axios.create({
  baseURL,
});

setupInterceptors(api);
