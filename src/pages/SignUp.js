import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar"; // ✅ Import the Navbar

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: fullName });
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error.message);
    }
  };

  return (
    <>
      <Navbar isLoggedIn={false} /> {/* ✅ Add Navbar */}
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a3f] to-[#3f00ff] flex flex-col justify-center items-center px-4 text-white">
        <div>
          <h1 className="mx-auto text-7xl text-center font-bold text-gray-900 flex items-center justify-center">
            <Logo />
          </h1>
        </div>

        <h2 className="text-2xl font-bold mb-8 text-indigo-200 text-center">
          Create an Account
        </h2>

        <form
          onSubmit={handleSignup}
          className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-xl border border-white/20 w-full max-w-md"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full rounded-md bg-white/20 text-white px-3 py-2 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-1">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-md bg-white/20 text-white px-3 py-2 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-white mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full rounded-md bg-white/20 text-white px-3 py-2 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 rounded-md hover:from-purple-600 hover:to-indigo-500 transition shadow-lg"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-indigo-200 mt-4">
            Already have an account?{" "}
            <a href="/login" className="font-semibold underline">
              Sign In
            </a>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
