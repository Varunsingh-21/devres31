import React, { useEffect, useState } from 'react';
import { db, auth } from '../services/firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';

const ChatDialog = ({ postId, sessionId, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const q = query(
      collection(db, 'posts', postId, 'chatSessions', sessionId, 'messages'),
      orderBy('timestamp')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [postId, sessionId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    await addDoc(collection(db, 'posts', postId, 'chatSessions', sessionId, 'messages'), {
      text: newMessage,
      senderID: auth.currentUser.uid,
      timestamp: serverTimestamp(),
    });

    setNewMessage('');
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 max-h-[70vh] bg-white text-black rounded-lg shadow-lg flex flex-col z-50 border border-gray-300">
      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b bg-indigo-600 text-white rounded-t-lg">
        <h2 className="text-lg font-semibold">Chat</h2>
        <button onClick={onClose} className="font-bold hover:text-red-300">✕</button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-100">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-xs px-3 py-2 rounded-md shadow ${
              msg.senderID === auth.currentUser.uid
                ? 'bg-indigo-500 text-white ml-auto'
                : 'bg-gray-300 text-black mr-auto'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex p-2 border-t bg-white">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 px-3 py-1 rounded border border-gray-300 mr-2"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatDialog;
