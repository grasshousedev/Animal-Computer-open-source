import axios from "axios";
import { endpoint } from "../constants";
import Qs from "qs";

export const store = axios.create({
  baseURL: endpoint,
});

export const authStore = axios.create({
  baseURL: endpoint,
});

export const productApi = axios.create({
  baseURL: endpoint,
  paramsSerializer: (params) => Qs.stringify(params, { arrayFormat: "repeat" }),
});

authStore.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
