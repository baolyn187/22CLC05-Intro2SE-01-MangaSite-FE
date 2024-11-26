import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json", // Default header
  },
});

export default axiosInstance;
