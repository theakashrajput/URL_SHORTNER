import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 10000,
    withCredentials: true
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "Server error";
    toast.error(message);
    return Promise.reject(error);
  }
);


export default axiosInstance;  