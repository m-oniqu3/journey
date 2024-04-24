import axios from "axios";

export const api = axios.create({
  baseURL: __API_PATH__,
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("journey-token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (
      error.status === 401 &&
      error.response.data.error.includes("Token expired")
    ) {
      //logout user
      delete api.defaults.headers.common["Authorization"];
      delete api.defaults.headers.common["Content-Type"];

      window.location.href = "/logout";
    }

    return Promise.reject(error);
  }
);
