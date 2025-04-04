import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, PlusCircle, LogOut } from "lucide-react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import Idea from "../idea.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  // 🔄 Check auth state on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-[#361274] to-[#5B2C9F] text-white shadow-md p-4 flex justify-between items-center">
      {/* 🔷 Logo + Links */}
      <div className="flex items-center space-x-8">
        <img
          src={Idea}
          alt="DevResolve Logo"
          className="h-10 w-auto cursor-pointer invert brightness-0 hover:opacity-80 transition"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          onClick={() => navigate(userLoggedIn ? "/dashboard" : "/")}
        />

        <div className="flex space-x-6 items-center">
          <Link to="/about" className="hover:text-orange-300 font-medium">About Us</Link>
          <Link to="/contact" className="hover:text-orange-300 font-medium">Contact Us</Link>

          {userLoggedIn && (
            <>
              <Link
                to="/dashboard"
                className={`flex items-center space-x-1 font-medium hover:text-indigo-300 ${
                  location.pathname === "/dashboard" ? "text-indigo-200" : ""
                }`}
              >
                <Home size={20} />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/post"
                className={`flex items-center space-x-1 font-medium hover:text-indigo-300 ${
                  location.pathname === "/post" ? "text-indigo-200" : ""
                }`}
              >
                <PlusCircle size={20} />
                <span>Post Doubt</span>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* 🔴 Login/Logout */}
      <div>
        {!userLoggedIn ? (
          <Link
            to="/login"
            className="bg-orange-500 hover:bg-orange-600 px-4 py-1 rounded font-medium"
          >
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 px-4 py-1 rounded text-white font-medium transition"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
