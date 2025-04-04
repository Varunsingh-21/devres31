import React, { useEffect, useState } from "react";
import { db, auth } from "../services/firebase";
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  serverTimestamp,
  updateDoc,
  increment,
} from "firebase/firestore";
import ChatDialog from "../components/ChatDialog";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [chatSession, setChatSession] = useState(null);
  const currentUser = auth.currentUser;

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
      const allPosts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(allPosts);
    });
    return () => unsub();
  }, []);

  const toggleReaction = async (postId, type) => {
    if (!currentUser) return alert("Please log in");
    const uid = currentUser.uid;
    const userReactionRef = doc(db, "posts", postId, "reactions", uid);
    const userReactionDoc = await getDoc(userReactionRef);

    const postRef = doc(db, "posts", postId);
    if (userReactionDoc.exists() && userReactionDoc.data()[type]) {
      // Undo reaction
      await updateDoc(postRef, {
        [`reactions.${type}`]: increment(-1),
      });
      await updateDoc(userReactionRef, {
        [type]: false,
      });
    } else {
      // New or updated reaction
      await updateDoc(postRef, {
        [`reactions.${type}`]: increment(1),
      });
      await setDoc(userReactionRef, { [type]: true }, { merge: true });
    }
  };

  const toggleFlag = async (postId, reason) => {
    if (!currentUser) return alert("Please log in");
    const uid = currentUser.uid;
    const userFlagRef = doc(db, "posts", postId, "flags", uid);
    const userFlagDoc = await getDoc(userFlagRef);

    const postRef = doc(db, "posts", postId);
    if (userFlagDoc.exists() && userFlagDoc.data()[reason]) {
      await updateDoc(postRef, {
        [`flags.${reason}`]: increment(-1),
      });
      await updateDoc(userFlagRef, {
        [reason]: false,
      });
    } else {
      await updateDoc(postRef, {
        [`flags.${reason}`]: increment(1),
      });
      await setDoc(userFlagRef, { [reason]: true }, { merge: true });
    }
  };

  const handleClaimAndChat = async (postId) => {
    if (!currentUser) return alert("Please log in");
    const sessionId = `session_${currentUser.uid}`;
    const chatRef = doc(db, "posts", postId, "chatSessions", sessionId);
    const chatDoc = await getDoc(chatRef);

    if (!chatDoc.exists()) {
      await setDoc(chatRef, {
        solverID: currentUser.uid,
        startTime: serverTimestamp(),
      });
    }
    setChatSession({ postId, sessionId });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-white">
      <Navbar isLoggedIn={true} />
      <div className="p-6 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center text-indigo-700">
          📋 All Doubts
        </h2>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No doubts found.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-lg p-6 mb-6 border border-gray-200 hover:shadow-xl transition duration-300 relative"
            >
              <h3 className="text-2xl font-semibold mb-2 text-gray-900">
                {post.title}
              </h3>
              <p className="text-gray-700 mb-1">{post.description}</p>
              <p className="text-sm text-gray-500">Category: {post.category}</p>
              <p className="text-sm text-green-600">Bounty: ${post.bounty}</p>
              <p className="text-sm text-blue-600">Status: {post.status}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <button onClick={() => toggleReaction(post.id, "like")} className="bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded text-sm">
                  👍 {post.reactions?.like || 0}
                </button>
                <button onClick={() => toggleReaction(post.id, "love")} className="bg-pink-100 hover:bg-pink-200 px-3 py-1 rounded text-sm">
                  ❤️ {post.reactions?.love || 0}
                </button>
                <button onClick={() => toggleReaction(post.id, "target")} className="bg-purple-100 hover:bg-purple-200 px-3 py-1 rounded text-sm">
                  🎯 {post.reactions?.target || 0}
                </button>

                <button onClick={() => toggleFlag(post.id, "notPaidEnough")} className="bg-yellow-100 hover:bg-yellow-200 px-3 py-1 rounded text-sm">
                  ❌ Not Paid Enough ({post.flags?.notPaidEnough || 0})
                </button>
                <button onClick={() => toggleFlag(post.id, "notClear")} className="bg-red-100 hover:bg-red-200 px-3 py-1 rounded text-sm">
                  ❓ Not Clear ({post.flags?.notClear || 0})
                </button>
                <button onClick={() => toggleFlag(post.id, "lessContext")} className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm">
                  📉 Less Context ({post.flags?.lessContext || 0})
                </button>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => handleClaimAndChat(post.id)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow"
                >
                  💬 Claim & Chat
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {chatSession && (
        <ChatDialog
          postId={chatSession.postId}
          sessionId={chatSession.sessionId}
          onClose={() => setChatSession(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
