import { jwtDecode } from "jwt-decode"; // Default import for Vite

export const saveToken = (accessToken) =>
  localStorage.setItem("accessToken", accessToken);
export const getToken = () => localStorage.getItem("accessToken");
export const logout = () => localStorage.removeItem("accessToken");
export const decodeToken = () => (getToken() ? jwtDecode(getToken()) : null);
