import React, { useState } from "react";
import Navbar from "../components/Navbar"; // ✅ Navbar
import Logo from "../components/Logo";     // Optional: Include your Logo

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.subject || !form.message) {
      setStatus("⚠️ Please fill in all fields.");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("/.netlify/functions/sendContact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus(`✅ Message sent successfully! Ref #${data.referenceId}`);
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("❌ Failed to send message. Try again.");
      }
    } catch (err) {
      console.error("Send error:", err);
      setStatus("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-[#1a1a3f] to-[#3f00ff] px-4 py-12 text-white">
        <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg border border-white/20">
          <h2 className="text-3xl font-bold mb-6 text-center text-indigo-200">📬 Contact Us</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              placeholder="Your Message"
              className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 rounded-md hover:from-purple-600 hover:to-indigo-500 transition shadow-lg"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {status && (
              <p className="text-center text-sm mt-2 text-indigo-200">{status}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
