import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";


const navigate = useNavigate();

const handleClaimAndChat = async (postId, posterID) => {
  const currentUser = auth.currentUser;
  const sessionId = `session_${currentUser.uid}`;
  const chatRef = doc(db, "posts", postId, "chatSessions", sessionId);

  const existing = await getDoc(chatRef);

  if (!existing.exists()) {
    await setDoc(chatRef, {
      solverID: currentUser.uid,
      startTime: serverTimestamp(),
    });
  }

  navigate(`/chat/${postId}/${sessionId}`);
};


{posts.map(post => (
  <div key={post.id} style={{ marginBottom: "1rem", background: "#f9f9f9", padding: "1rem", borderRadius: "8px" }}>
    <strong>{post.title}</strong> <br />
    Category: {post.category} <br />
    Bounty: ${post.bounty} <br />
    {auth.currentUser?.uid !== post.posterID && (
      <button
        style={{ marginTop: "0.5rem", backgroundColor: "#6200ea", color: "white", padding: "6px 12px", borderRadius: "5px", border: "none", cursor: "pointer" }}
        onClick={() => handleClaimAndChat(post.id, post.posterID)}
      >
        Claim & Chat
      </button>
    )}
  </div>
))}

export default ViewDoubts;
