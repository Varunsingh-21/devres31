import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import ViewUsers from "./pages/ViewUsers";
import PostDoubt from "./pages/PostDoubt";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { auth } from "./services/firebase";
import { signOut } from "firebase/auth";
import ChatDialog from "./components/ChatDialog";  // ✅ correct
import Home from "./pages/Home1";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";

function App() {
  useEffect(() => {
    const TABS_KEY = "active-tabs";
    const STALE_TIMEOUT = 15000; // ⏳ Extended for better reload support
    const CHECK_INTERVAL = 2000;

    let tabId = sessionStorage.getItem("tabId");
    if (!tabId) {
      tabId = crypto.randomUUID();
      sessionStorage.setItem("tabId", tabId);
    }

    const updateTabs = () => {
      const now = Date.now();
      let tabs = JSON.parse(localStorage.getItem(TABS_KEY) || "[]");

      tabs = tabs.filter((tab) => now - tab.timestamp < STALE_TIMEOUT);

      const existing = tabs.find((tab) => tab.id === tabId);
      if (existing) {
        existing.timestamp = now;
      } else {
        tabs.push({ id: tabId, timestamp: now });
      }

      localStorage.setItem(TABS_KEY, JSON.stringify(tabs));
    };

    const cleanupAndMaybeLogout = () => {
      const now = Date.now();
      let tabs = JSON.parse(localStorage.getItem(TABS_KEY) || "[]");

      tabs = tabs.filter((tab) => tab.id !== tabId);
      tabs = tabs.filter((tab) => now - tab.timestamp < STALE_TIMEOUT);
      localStorage.setItem(TABS_KEY, JSON.stringify(tabs));

      // 🛡️ Prevent logout on page refresh
      if (performance?.navigation?.type === 1) {
        console.log("🔄 Skipping logout due to refresh.");
        return;
      }

      setTimeout(() => {
        const currentTabs = JSON.parse(localStorage.getItem(TABS_KEY) || "[]");
        const freshTabs = currentTabs.filter(
          (tab) => now - tab.timestamp < STALE_TIMEOUT
        );

        if (freshTabs.length === 0) {
          console.log("🧹 All tabs closed — signing out...");
          signOut(auth)
            .then(() => console.log("✅ Auto logout complete"))
            .catch((err) => console.error("Logout error:", err));
        }
      }, 3000);
    };

    const interval = setInterval(updateTabs, CHECK_INTERVAL);
    window.addEventListener("beforeunload", cleanupAndMaybeLogout);

    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", cleanupAndMaybeLogout);
      cleanupAndMaybeLogout();
    };
  }, []);

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/users" element={<ViewUsers />} />
        <Route path="/post" element={<PostDoubt />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutUs />} />
        
        


        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
