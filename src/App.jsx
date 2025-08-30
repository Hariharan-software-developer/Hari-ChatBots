// ...existing code...

import Chatbot from "./components/Chatbot";
import { useState } from "react";

export default function App() {
  // Chat history state: array of { id, messages }
  const [chats, setChats] = useState([
    { id: 1, messages: [] },
  ]);
  const [currentChatIdx, setCurrentChatIdx] = useState(0);

  // Start a new chat
  const handleNewChat = () => {
    setChats((prev) => [{ id: Date.now(), messages: [] }, ...prev]);
    setCurrentChatIdx(0);
  };

  // Switch to previous chat (if exists)
  const handlePreviousChat = () => {
    if (chats.length > 1 && currentChatIdx < chats.length - 1) {
      setCurrentChatIdx(currentChatIdx + 1);
    }
  };

  // Update messages for current chat
  const setCurrentMessages = (messages) => {
    setChats((prev) =>
      prev.map((chat, idx) =>
        idx === currentChatIdx ? { ...chat, messages } : chat
      )
    );
  };

  return (
    <div className="min-h-screen w-full flex bg-gradient-to-br from-gray-900 via-gray-950 to-blue-950">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-gradient-to-b from-gray-950 to-blue-950 border-r border-blue-900/40 p-6 gap-6 min-h-screen shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5" />
            </svg>
          </span>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-blue-200 bg-clip-text text-transparent drop-shadow">AI ChatBot</span>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="text-blue-200/80 text-sm font-semibold mb-2">Chat History</div>
          <div className="flex flex-col gap-2">
            <button
              className="text-left px-3 py-2 rounded-lg bg-blue-900/30 hover:bg-blue-800/40 text-blue-100 font-medium transition"
              onClick={handleNewChat}
            >
              New Chat
            </button>
            <button
              className="text-left px-3 py-2 rounded-lg bg-blue-900/10 hover:bg-blue-800/20 text-blue-200/80 font-medium transition disabled:opacity-50"
              onClick={handlePreviousChat}
              disabled={chats.length <= 1 || currentChatIdx >= chats.length - 1}
            >
              Previous Chat
            </button>
          </div>
        </div>
        <div className="mt-8 text-xs text-blue-200/60">© 2025 Hari ChatBot</div>
      </aside>
      {/* Main Chat Area */}
      <main className="flex-1 flex items-center justify-center min-h-screen bg-transparent">
        <div className="w-full max-w-3xl p-2 md:p-8">
          <Chatbot
            messages={chats[currentChatIdx].messages}
            setMessages={setCurrentMessages}
          />
        </div>
      </main>
    </div>
  );
}
