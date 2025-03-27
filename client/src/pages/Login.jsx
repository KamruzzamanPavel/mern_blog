import React, { useState } from "react";
import axios from "axios";
import { saveToken, decodeToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5555/api/auth/login",
        form,
        { withCredentials: true } // Allow sending cookies for refresh token
      );
      saveToken(data.accessToken);
      setUser(decodeToken());
      navigate("/");
    } catch (error) {
      console.error("Login Failed", error);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 border rounded shadow-md">
      <h2 className="text-xl font-bold">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
