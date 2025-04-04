import React from "react";
import Navbar from "../components/Navbar";

const authors = [
  {
    name: "Varun Deep Singh",
    role: "Full Stack Developer",
    img: "/images/author2.png",
    linkedin: "https://www.linkedin.com/in/varun-singh-80b10b251",
    github: "https://github.com/Varunsingh-21?tab=repositories"
  },
  {
    name: "Pratham Patel",
    role: "Frontend Engineer",
    img: "/images/author2.png",
    linkedin: "https://www.linkedin.com/in/prathampatel",
    github: "https://github.com/prathampatel"
  },
  {
    name: "Devarsh Limachiya",
    role: "UI/UX Designer",
    img: "/images/author3.png",
    linkedin: "https://www.linkedin.com/in/devarshlimachiya",
    github: "https://github.com/devarshlimachiya"
  },
  {
    name: "Drashya Patel",
    role: "Full Stack Developer",
    img: "/images/author3.png",
    linkedin: "https://www.linkedin.com/in/drashyapatel",
    github: "https://github.com/Drashya222"
  }
];

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-indigo-900 to-purple-800 min-h-screen text-white">
      <Navbar isLoggedIn={false} />

      <section className="text-center py-14 px-6">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <p className="text-purple-200 max-w-4xl mx-auto">
          I Doubt is a platform designed to connect learners and problem solvers in the tech industry. Whether you're a student stuck on an assignment, a developer debugging a tricky issue, or a professional offering help — this platform is for you.
        </p>
      </section>

      <section className="text-center py-10 px-6">
        <h2 className="text-3xl font-semibold mb-4 text-white">🚀 Our Vision</h2>
        <p className="text-purple-200 max-w-4xl mx-auto">
          To create an ecosystem where people can grow through knowledge exchange. We envision a world where questions and solutions are valued equally — with actual rewards and recognition for helping others.
        </p>
      </section>

      <section className="text-center py-10 px-6">
        <h2 className="text-3xl font-semibold mb-4 text-white">📦 Use Cases</h2>
        <ul className="text-left max-w-2xl mx-auto text-purple-200 list-disc list-inside">
          <li>Students post programming doubts for help and set a bounty.</li>
          <li>Freelancers/mentors claim doubts and get rewarded upon solving.</li>
          <li>Admins manage user activities, ban/unban users if necessary.</li>
          <li>Chat interface ensures transparency during doubt-solving.</li>
        </ul>
      </section>

      <section className="py-10 text-center px-6">
        <h2 className="text-3xl font-semibold mb-6 text-white">👨‍💻 Meet the Creators</h2>
        <div className="flex flex-wrap justify-center gap-10">
          {authors.map((author, index) => (
            <div
              key={index}
              className="w-64 text-center transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500 bg-purple-900 p-4 rounded-xl"
            >
              <img
                src={author.img}
                alt={author.name}
                className="rounded-full w-28 h-28 mx-auto mb-2 border-4 border-purple-500"
              />
              <h3 className="font-bold text-white">{author.name}</h3>
              <p className="text-sm text-purple-300 mb-2">{author.role}</p>
              <div className="flex justify-center gap-4">
                <a href={author.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline text-sm">LinkedIn</a>
                <a href={author.github} target="_blank" rel="noopener noreferrer" className="text-gray-300 underline text-sm">GitHub</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
