import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5555/api/auth/register", form);
      navigate("/login");
    } catch (error) {
      console.error("Registration Failed", error);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 border rounded shadow-md">
      <h2 className="text-xl font-bold">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Username"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
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
        <button type="submit" className="bg-green-500 text-white px-4 py-2">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
