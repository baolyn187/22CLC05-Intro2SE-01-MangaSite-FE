import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.example.com", // Replace with your API's base URL
  timeout: 10000, // Optional timeout for requests
  headers: {
    "Content-Type": "application/json", // Default header
  },
});

export default axiosInstance;
