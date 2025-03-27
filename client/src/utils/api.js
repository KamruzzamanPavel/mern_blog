import axios from "axios";
import { decodeToken } from "./auth";
const api = axios.create({
  baseURL: "http://localhost:5555",
  withCredentials: true, // Important for sending cookies
});

// Request Interceptor to Attach Access Token
api.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor to Handle Token Expiry
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("inside response:", error);

    if (error.response.status === 401) {
      try {
        const { data } = await axios.post(
          "http://localhost:5555/api/auth/refresh",
          {},
          { withCredentials: true }
        );
        localStorage.setItem("accessToken", data.accessToken);
        console.log("refreshed user", decodeToken(data.accessToken));

        error.config.headers.Authorization = `Bearer ${data.accessToken}`;
        return api.request(error.config); // Retry the failed request
      } catch (refreshError) {
        console.log("Refresh failed, logging out...", refreshError);
        // localStorage.removeItem("accessToken");
        // window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
