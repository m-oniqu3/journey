import axios from "axios";

export const api = axios.create({
  baseURL: __API_PATH__,
  withCredentials: true,
});
