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
    // Handle successful responses
    return response;
  },
  async (error) => {
    console.log("api error", error.response);

    // Check if the error is related to a token expiration
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.error &&
      error.response.data.error.includes("Token expired")
    ) {
      console.log("Token expired. Logging out...");

      delete api.defaults.headers.common["Authorization"];
      delete api.defaults.headers.common["Content-Type"];

      localStorage.removeItem("journey-user");
      localStorage.removeItem("journey-token");

      window.location.href = "/logout"; // Redirect to the logout page

      return Promise.reject(error);
    }

    // Pass the error to the next error handler
    return Promise.reject(error);
  }
);
