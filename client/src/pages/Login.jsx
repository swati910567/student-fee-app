import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = ({ setAuth }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      axios.defaults.headers.common["x-auth-token"] = res.data.token;
      setAuth(true);
      navigate("/profile");
    } catch (err) {
      setError(
        err.response?.data?.msg ||
          "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-128px)] animate-fade-in">
      <div className="relative w-full max-w-md m-4">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg blur opacity-50"></div>
        <div className="relative bg-white p-8 rounded-lg shadow-xl">
          <h1 className="text-3xl font-bold mb-6 text-center text-slate-800">
            Welcome Back!
          </h1>
          {error && (
            <p className="text-red-500 bg-red-100 p-3 rounded-md mb-4 text-center">
              {error}
            </p>
          )}
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-semibold text-slate-600">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
                className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-slate-600">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                required
                className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg font-semibold transform hover:translate-y-[-2px]"
            >
              Login
            </button>
          </form>
          <p className="mt-6 text-center text-slate-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
