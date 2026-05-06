import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  // gets the token from the URL automatically
  // e.g. /reset-password?token=abc123 → token = "abc123"
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    if (newPassword.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/reset-password`,
        { token, newPassword },
      );
      if (res.data.success) {
        setDone(true);
        toast.success("Password reset successfully!");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // if no token in URL
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Invalid or missing reset link.</p>
          <button
            onClick={() => navigate("/forgot-password")}
            className="bg-black text-white py-2 px-6 rounded text-sm"
          >
            Request New Link
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {!done ? (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Reset Password
            </h2>
            <p className="text-gray-500 mb-6 text-sm">
              Enter your new password below.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-black"
              />
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-black"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-black text-white py-2 rounded text-sm hover:bg-gray-800 transition disabled:opacity-50"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </>
        ) : (
          // success state
          <div className="text-center">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Password Reset!
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Your password has been updated successfully.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="bg-black text-white py-2 px-6 rounded text-sm hover:bg-gray-800 transition"
            >
              Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
