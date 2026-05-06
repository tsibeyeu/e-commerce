import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/forgot-password`,
        { email },
      );
      if (res.data.success) {
        setSent(true);
        toast.success("Reset link sent! Check your email.");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {!sent ? (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Forgot Password
            </h2>
            <p className="text-gray-500 mb-6 text-sm">
              Enter your email and we'll send you a reset link.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-black"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-black text-white py-2 rounded text-sm hover:bg-gray-800 transition disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
            <p
              onClick={() => navigate("/login")}
              className="text-sm text-center text-gray-500 mt-4 cursor-pointer hover:text-black"
            >
              Back to Login
            </p>
          </>
        ) : (
          // success state
          <div className="text-center">
            <div className="text-5xl mb-4">📧</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Check your email
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              We sent a password reset link to <strong>{email}</strong>
            </p>
            <button
              onClick={() => navigate("/login")}
              className="bg-black text-white py-2 px-6 rounded text-sm hover:bg-gray-800 transition"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
