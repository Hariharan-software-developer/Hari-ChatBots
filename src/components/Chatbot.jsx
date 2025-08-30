import { useState, useRef, useEffect } from "react";



export default function Chatbot({ messages, setMessages }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
  setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) throw new Error(`API Error: ${response.status}`);

      const data = await response.json();
      const botMessage = {
        role: "assistant",
        content: data.choices?.[0]?.message?.content || "No reply",
      };

  setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages([
        ...messages,
        userMessage,
        { role: "assistant", content: "⚠️ Error: Unable to fetch reply." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto p-0 bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 rounded-3xl shadow-2xl min-h-[80vh] border border-blue-400/30">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-700 via-purple-700 to-blue-900 rounded-t-3xl border-b border-blue-400/30">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5" />
            </svg>
          </span>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-blue-200 bg-clip-text text-transparent drop-shadow">AI ChatBot</span>
        </div>
        <span className="text-xs text-blue-200/80 font-mono">Powered by Llama3</span>
      </div>

      {/* Messages */}
      <div className="flex flex-col space-y-4 overflow-y-auto p-6 flex-1 custom-scrollbar" style={{ minHeight: "60vh", maxHeight: "60vh" }}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div className="flex-shrink-0 mr-2">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5" />
                  </svg>
                </span>
              </div>
            )}
            <div
              className={`p-4 rounded-2xl max-w-[70%] break-words shadow-md text-base font-medium whitespace-pre-line ${
                msg.role === "user"
                  ? "bg-gradient-to-br from-blue-500 to-blue-700 text-white self-end border border-blue-300/30 animate-slideUp"
                  : "bg-gradient-to-br from-gray-800 via-purple-900 to-blue-900 text-blue-100 self-start border border-purple-300/20 animate-fadeIn"
              }`}
            >
              {msg.content}
            </div>
            {msg.role === "user" && (
              <div className="flex-shrink-0 ml-2">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                  </svg>
                </span>
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 mr-2">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5" />
                </svg>
              </span>
            </div>
            <div className="bg-gradient-to-br from-gray-800 via-purple-900 to-blue-900 p-4 rounded-2xl text-blue-100 animate-pulse border border-purple-300/20">
              ⏳ Typing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-800 via-purple-900 to-blue-900 rounded-b-3xl border-t border-blue-400/30">
        <input
          type="text"
          value={input}
          placeholder="Ask me anything..."
          className="flex-1 p-3 rounded-xl bg-gray-900/80 border border-blue-400/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:bg-gray-900/90 placeholder:text-blue-200/60 font-medium shadow-inner"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="px-5 py-2.5 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:from-blue-600 hover:to-purple-700 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400/60"
          disabled={loading || !input.trim()}
        >
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            Send
          </span>
        </button>
      </div>
    </div>
  );
}
