import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import AllStudents from "./pages/AllStudents";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Payment from "./pages/Payment";
import axios from "axios";

// Axios ke liye default URL set kar rahe hain
axios.defaults.baseURL = "http://localhost:5001";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  // Logout logic ko App.js mein centralize kiya gaya hai
  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["x-auth-token"];
    setAuth(false);
  };

  async function checkAuth() {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["x-auth-token"] = token;
        await axios.get("/api/students/profile");
        setAuth(true);
      } else {
        setAuth(false);
      }
    } catch (err) {
      console.error(err.message);
      localStorage.removeItem("token");
      setAuth(false);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-slate-100">
        <div className="spinner"></div>
        <p className="mt-4 text-lg text-slate-600">Loading Application...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
        <Navbar isAuthenticated={isAuthenticated} logout={logout} />
        <main className="container mx-auto mt-8 p-4">
          <Routes>
            <Route path="/" element={<AllStudents />} />
            <Route
              path="/login"
              element={
                !isAuthenticated ? (
                  <Login setAuth={setAuth} />
                ) : (
                  <Navigate to="/profile" />
                )
              }
            />
            <Route
              path="/signup"
              element={
                !isAuthenticated ? (
                  <Signup setAuth={setAuth} />
                ) : (
                  <Navigate to="/profile" />
                )
              }
            />
            <Route
              path="/profile"
              element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/payment"
              element={isAuthenticated ? <Payment /> : <Navigate to="/login" />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
