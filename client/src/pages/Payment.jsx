import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePayment = async () => {
    setProcessing(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await axios.post(
        "/api/students/pay",
        {},
        { headers: { "x-auth-token": token } }
      );
      navigate("/profile");
    } catch (err) {
      setError("Payment simulation failed.Please try again later.");
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 text-center text-slate-800">
        Secure Fee Payment
      </h1>

      <div className="payment-card-container mb-8">
        <div className="payment-card bg-gradient-to-br from-slate-700 to-slate-900 p-6 rounded-xl shadow-2xl text-white font-mono relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <span className="text-lg font-semibold">University Bank</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-300"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <div className="mb-8">
              <p className="text-2xl tracking-widest text-slate-300">
                **** **** **** 1234
              </p>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <label className="block mb-1 text-xs text-slate-400 uppercase">
                  Card Holder
                </label>
                <p className="text-md uppercase">Student Name</p>
              </div>
              <div>
                <label className="block mb-1 text-xs text-slate-400 uppercase">
                  Expires
                </label>
                <p className="text-md">12/25</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        {error && (
          <p className="text-red-500 bg-red-100 p-3 rounded-md mb-4 text-center">
            {error}
          </p>
        )}
        <button
          onClick={handlePayment}
          disabled={processing}
          className="w-full bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg font-semibold text-lg transform hover:scale-105"
        >
          {processing ? (
            <div className="flex justify-center items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </div>
          ) : (
            "Confirm & Pay (₹5000)"
          )}
        </button>
      </div>
    </div>
  );
};

export default Payment;
