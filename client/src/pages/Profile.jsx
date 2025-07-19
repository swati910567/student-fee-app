import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    feesPaid: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/students/profile", {
        headers: { "x-auth-token": token },
      });
      setStudent(res.data);
      setFormData({ name: res.data.name, email: res.data.email });
    } catch (err) {
      setError("Profile can't be fetched now.");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put("/api/students/profile", formData, {
        headers: { "x-auth-token": token },
      });
      setStudent(res.data);
      setSuccess("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      setError("PFailed to update the profile.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 text-center text-slate-800">
        My Profile
      </h1>
      {error && (
        <p className="text-red-500 bg-red-100 p-3 rounded-md mb-4 text-center">
          {error}
        </p>
      )}
      {success && (
        <p className="text-green-500 bg-green-100 p-3 rounded-md mb-4 text-center">
          {success}
        </p>
      )}

      {!isEditing ? (
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 rounded-lg">
            <span className="w-24 font-semibold text-slate-500">Name:</span>{" "}
            <span className="ml-4 text-slate-700">{student.name}</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg">
            <span className="w-24 font-semibold text-slate-500">Email:</span>{" "}
            <span className="ml-4 text-slate-700">{student.email}</span>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="w-full bg-slate-700 text-white p-3 rounded-lg hover:bg-slate-800 transition-all duration-300 shadow-md transform hover:translate-y-[-2px]"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold text-slate-600">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-slate-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md transform hover:translate-y-[-2px]"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="w-full bg-slate-300 text-slate-800 p-3 rounded-lg hover:bg-slate-400 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="mt-8 pt-6 border-t border-slate-200">
        <h2 className="text-2xl font-bold mb-4 text-slate-800">Fee Status</h2>
        <div
          className={`p-4 rounded-lg flex justify-between items-center ${
            student.feesPaid ? "bg-green-100" : "bg-orange-100"
          }`}
        >
          <p
            className={`text-lg font-semibold ${
              student.feesPaid ? "text-green-800" : "text-orange-800"
            }`}
          >
            Status: {student.feesPaid ? "Paid" : "Pending"}
          </p>
          {!student.feesPaid && (
            <button
              onClick={() => navigate("/payment")}
              className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-transform duration-300 transform hover:scale-105 font-semibold shadow-md"
            >
              Pay Fees Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
