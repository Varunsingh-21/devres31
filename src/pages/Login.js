import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await setPersistence(auth, browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <>
      {/* ✅ Persistent Navbar */}
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-[#1a1a3f] to-[#3f00ff] flex flex-col justify-center items-center px-4 text-white">
        <div>
          <h1 className="mx-auto text-7xl text-center font-bold text-gray-900 flex items-center justify-center">
            <Logo />
          </h1>
        </div>

        <h2 className="text-2xl font-bold mb-8 text-indigo-200 text-center">
          Sign in to your account
        </h2>

        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-xl border border-white/20 w-full max-w-md">
          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-1">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded-md bg-white/20 text-white px-3 py-2 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-white mb-1">
                Password
              </label>
              <span className="text-sm text-indigo-200 hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-md bg-white/20 text-white px-3 py-2 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 rounded-md hover:from-purple-600 hover:to-indigo-500 transition shadow-lg"
          >
            Login
          </button>

          <p className="text-center text-sm text-indigo-200 mt-4">
            Don't have an account?{" "}
            <a href="/signup" className="font-semibold underline">
              Create one
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
