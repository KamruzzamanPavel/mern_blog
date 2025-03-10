import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import { decodeToken, getToken } from "./utils/auth";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setUser(decodeToken());
    }
  }, []);
  console.log(user);
  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          {user?.role === "admin" && (
            <Route path="/admin" element={<AdminDashboard />} />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
