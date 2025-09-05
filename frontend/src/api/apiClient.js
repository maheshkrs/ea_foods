import axios from "axios";
import dayjs from "dayjs";

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000
});

// interceptor
api.interceptors.request.use(
  (config) => {
    config.headers["X-Request-At"] = dayjs().toISOString();
    return config;
  },
  (error) => Promise.reject(error)
);

// interceptor
api.interceptors.response.use(
  (resp) => resp,
  (error) => {
    const normalized =
      error?.response?.data?.error ||
      error?.response?.data ||
      error?.message ||
      "Network Error";

    return Promise.reject(new Error(normalized));
  }
);

export async function apiGet(path) {
  const { data } = await api.get(path);
  return data;
}

export async function apiPost(path, body) {
  const { data } = await api.post(path, body);
  return data;
}

export async function apiPatch(path, body) {
  const { data } = await api.patch(path, body);
  return data;
}

export async function apiDelete(path) {
  const { data } = await api.delete(path);
  return data;
}

export default api;
