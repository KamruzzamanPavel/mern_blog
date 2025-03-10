import { jwtDecode } from "jwt-decode"; // Default import for Vite

export const saveToken = (token) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");
export const logout = () => localStorage.removeItem("token");
export const decodeToken = () => (getToken() ? jwtDecode(getToken()) : null);
