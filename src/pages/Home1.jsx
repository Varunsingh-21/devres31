// 📁 File: src/pages/Home.jsx
import React from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-indigo-900 to-purple-800 min-h-screen text-white">
      <Navbar isLoggedIn={false} />

      {/* 🔷 Carousel */}
      <div className="w-full overflow-hidden relative h-64 mt-6">
        <div className="flex w-[300%] animate-scroll">
          <img src="/images/c1.png" alt="Slide 1" className="w-full object-cover h-64" />
          <img src="/images/c2.png" alt="Slide 2" className="w-full object-cover h-64" />
          <img src="/images/c3.png" alt="Slide 3" className="w-full object-cover h-64" />
        </div>
      </div>

      {/* 🔷 Welcome Section */}
      <section className="text-center py-14">
        <h1 className="text-5xl font-extrabold mb-4">Welcome to <span className="text-purple-300">DevResolve</span></h1>
        <p className="text-lg text-purple-200">A community where solving doubts earns you real rewards.</p>
      </section>

      {/* 🔷 Our Aim Section */}
      <section className="bg-purple-900 py-14 text-center px-4">
        <h2 className="text-3xl font-semibold mb-3 text-white">🎯 Our Aim</h2>
        <p className="text-purple-200 max-w-3xl mx-auto">
          At "DevResolve", our mission is to bridge the gap between learners and problem solvers
          in the IT industry. We want to empower students, freelancers, and professionals to help
          each other, build community, and get rewarded for their knowledge.
        </p>
      </section>

      {/* 🔷 Authors */}
      <section className="py-14 text-center">
        <h2 className="text-3xl font-semibold mb-6 text-white">👨‍💻 Meet the Creators</h2>
        <div className="flex flex-wrap justify-center gap-10">
          {[
            { name: "Varun Deep Singh", role: "Full Stack Developer", img: "/images/author2.png" },
            { name: "Pratham Patel", role: "Frontend Engineer", img: "/images/author2.png" },
            { name: "Devarsh Limachiya", role: "UI/UX Designer", img: "/images/author3.png" },
            { name: "Drashya Patel", role: "Full-Stack Developer", img: "/images/author3.png" },
          ].map((author, index) => (
            <div
              key={index}
              className="w-48 text-center transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500"
            >
              <img src={author.img} alt={author.name} className="rounded-full w-32 h-32 mx-auto mb-2 border-4 border-purple-500" />
              <h3 className="font-bold text-white">{author.name}</h3>
              <p className="text-sm text-purple-300">{author.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
