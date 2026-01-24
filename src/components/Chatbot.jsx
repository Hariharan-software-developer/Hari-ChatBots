import { useState, useRef, useEffect } from "react";

export default function Chatbot() {
  // ✅ FIX 1: Chatbot owns its own messages state
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // ✅ GROQ ONLY
      const GROQ_KEY = import.meta.env.VITE_GROQ_API_KEY;
      if (!GROQ_KEY) throw new Error("Missing VITE_GROQ_API_KEY");

      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${GROQ_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // ✅ FIX 2: NON-DEPRECATED MODEL
            model: "llama-3.1-8b-instant",
            messages: [...messages, userMessage],
            temperature: 0.7,
            max_tokens: 1024,
          }),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }

      const data = await response.json();

      const botMessage = {
        role: "assistant",
        content:
          data.choices?.[0]?.message?.content ??
          "⚠️ No response from Groq",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Groq Error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `⚠️ ${err.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto min-h-[80vh] bg-gray-900 text-white rounded-xl">

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={msg.role === "user" ? "text-right" : "text-left"}
          >
            <div
              className={`inline-block p-3 rounded-lg max-w-[70%] ${
                msg.role === "user"
                  ? "bg-blue-600"
                  : "bg-gray-800"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-gray-400 animate-pulse">
            ⏳ Typing...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2 p-4 border-t border-gray-700">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 p-2 bg-black border border-gray-700 rounded"
          placeholder="Ask me anything..."
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
