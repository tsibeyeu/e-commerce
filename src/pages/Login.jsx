import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import {
  RiMailLine,
  RiLockPasswordLine,
  RiUserLine,
  RiArrowRightLine,
} from "react-icons/ri";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, backendURL, Navigate } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (currentState === "Sign Up" && password !== passwordConfirmation) {
      return toast.error("Passwords do not match");
    }

    try {
      const endpoint =
        currentState === "Sign Up" ? "/api/user/register" : "/api/user/login";
      const payload =
        currentState === "Sign Up"
          ? { email, name, password }
          : { email, password };

      const response = await axios.post(backendURL + endpoint, payload);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (token) Navigate("/");
  }, [token]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-[450px] bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-10 md:p-14"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tighter italic mb-2">
            {currentState === "Login" ? "WELCOME BACK." : "JOIN US."}
          </h2>
          <p className="text-gray-400 text-sm font-light">
            {currentState === "Login"
              ? "Enter your credentials to access your account"
              : "Create an account to start your journey"}
          </p>
        </div>

        <div className="space-y-5">
          {/* Name Field (Sign Up only) */}
          {currentState === "Sign Up" && (
            <div className="relative group">
              <RiUserLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-sm outline-none focus:ring-2 ring-black/5 transition-all"
                placeholder="Full Name"
                required
              />
            </div>
          )}

          {/* Email Field */}
          <div className="relative group">
            <RiMailLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-sm outline-none focus:ring-2 ring-black/5 transition-all"
              placeholder="Email Address"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative group">
            <RiLockPasswordLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-sm outline-none focus:ring-2 ring-black/5 transition-all"
              placeholder="Password"
              required
            />
          </div>

          {/* Password Confirmation (Sign Up only) */}
          {currentState === "Sign Up" && (
            <div className="relative group">
              <RiLockPasswordLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" />
              <input
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                value={passwordConfirmation}
                type="password"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-sm outline-none focus:ring-2 ring-black/5 transition-all"
                placeholder="Confirm Password"
                required
              />
            </div>
          )}
        </div>

        {/* Action Links */}
        <div className="flex flex-col gap-4 mt-8">
          <div className="flex justify-between text-[11px] font-bold tracking-widest uppercase text-gray-400">
            <span className="cursor-pointer hover:text-black transition-colors">
              Forgot Password?
            </span>
            <span
              className="cursor-pointer text-black border-b border-black"
              onClick={() =>
                setCurrentState(currentState === "Login" ? "Sign Up" : "Login")
              }
            >
              {currentState === "Login" ? "Create Account" : "Back to Login"}
            </span>
          </div>

          <button className="group w-full bg-black text-white rounded-2xl py-4 font-bold text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-3 hover:bg-gray-900 transition-all active:scale-[0.98] mt-4">
            {currentState === "Login" ? "Sign In" : "Sign Up"}
            <RiArrowRightLine className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
