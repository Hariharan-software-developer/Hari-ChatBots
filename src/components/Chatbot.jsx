import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
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

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Error: Unable to fetch reply." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto p-4 bg-gray-900/80 backdrop-blur-md text-white rounded-2xl shadow-lg min-h-[80vh]">
      {/* Messages */}
      <div className="flex flex-col space-y-3 overflow-y-auto p-3 flex-1">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg max-w-xs break-words ${
              msg.role === "user"
                ? "bg-blue-600 self-end animate-slideUp"
                : "bg-gray-700 self-start animate-fadeIn"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="bg-gray-700 p-3 rounded-lg self-start animate-pulse">
            ⏳ Typing...
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex mt-3 space-x-2">
        <input
          type="text"
          value={input}
          placeholder="Ask me anything..."
          className="flex-1 p-3 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-600 rounded-xl hover:bg-blue-700 transition transform hover:scale-105"
        >
          Send
        </button>
      </div>
    </div>
  );
}
