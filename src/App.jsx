import { useEffect, useState } from "react";
import Chatbot from "./components/Chatbot";

export default function App() {
  const [bgGradient, setBgGradient] = useState("");

  useEffect(() => {
    const gradients = [
      "linear-gradient(135deg, #ff9a9e, #fad0c4)",
      "linear-gradient(135deg, #a18cd1, #fbc2eb)",
      "linear-gradient(135deg, #f6d365, #fda085)",
      "linear-gradient(135deg, #84fab0, #8fd3f4)",
      "linear-gradient(135deg, #ffecd2, #fcb69f)",
      "linear-gradient(135deg, #43e97b, #38f9d7)",
      "linear-gradient(135deg, #667eea, #764ba2)",
      "linear-gradient(135deg, #ff758c, #ff7eb3)"
    ];

    // Pick a random gradient
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
    setBgGradient(randomGradient);
  }, []);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{
        background: bgGradient,
      }}
    >
      <div className="bg-black bg-opacity-50 w-full min-h-screen flex items-center justify-center p-4">
        <Chatbot />
      </div>
    </div>
  );
}
