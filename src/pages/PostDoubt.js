import React, { useState } from 'react';
import { db, auth } from '../services/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import Navbar from "../components/Navbar";

const PostDoubt = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [bounty, setBounty] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !category || !bounty) {
      alert("Please fill in all fields");
      return;
    }

    await addDoc(collection(db, "posts"), {
      title,
      description,
      category,
      bounty: parseInt(bounty),
      status: "open",
      posterID: auth.currentUser.uid,
      solverID: null,
      createdAt: Timestamp.now()
    });

    alert("✅ Doubt posted!");
    setTitle('');
    setDescription('');
    setCategory('');
    setBounty('');
  };

  return (
    <div>
    <Navbar />
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 shadow-md rounded-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600">📝 Post a Doubt</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows="4"
        ></textarea>

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
          <input
            type="number"
            step="0.01"
            min="0.01"
            placeholder="Bounty"
            value={bounty}
            onChange={(e) => setBounty(e.target.value)}
            className="w-full pl-7 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-500 transition"
        >
          Post Doubt
        </button>
      </form>
    </div>
    </div>
  );
};

export default PostDoubt;