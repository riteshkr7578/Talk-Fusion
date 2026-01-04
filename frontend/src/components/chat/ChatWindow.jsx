import { useState, useRef, useEffect } from "react";
import axios from "axios";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async (input) => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("User not authenticated");
      }

      const res = await axios.post(
        `${API_URL}/chat`,
        { message: input },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Add bot response
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: res.data.reply },
      ]);
    } catch (error) {
  console.error("FULL CHAT ERROR 👉", {
    message: error.message,
    status: error.response?.status,
    data: error.response?.data,
    headers: error.response?.headers,
  });

  setMessages((prev) => [
    ...prev,
    {
      sender: "bot",
      text: `⚠️ Error ${error.response?.status || ""}: ${
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message
      }`,
    },
  ]);
}


    setLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
   {messages.length === 0 && !loading && (
  <div className="flex items-center justify-center h-full text-center select-none">
    <p className="text-3xl md:text-4xl font-semibold text-gray-300">
      How can I help you?
    </p>
  </div>
)}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} msg={msg} />
        ))}

        {loading && (
          <div className="bg-gray-700 p-3 rounded-xl w-fit mr-auto animate-pulse">
            Fusion is typing...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={sendMessage} />
    </div>
  );
}
