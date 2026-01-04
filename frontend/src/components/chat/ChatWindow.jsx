import { useEffect, useRef, useState } from "react";
import axios from "axios";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function ChatWindow({
  isLoggedIn,
  chats,
  setChats,
  activeChatId,
}) {
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

const activeChat = chats.find(
  (c) => String(c._id || c.id) === String(activeChatId)
);

const messages = activeChat ? activeChat.messages : [];


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeChatId]);

  const updateChatMessages = (newMessage) => {
    setChats((prev) =>
      prev.map((chat) =>
        (chat._id || chat.id) === activeChatId
          ? {
              ...chat,
              title:
                chat.messages.length === 0 && newMessage.sender === "user"
                  ? newMessage.text.slice(0, 30)
                  : chat.title,
              messages: [...chat.messages, newMessage],
            }
          : chat
      )
    );
  };

  const sendMessage = async (input) => {
    if (!input.trim() || !activeChatId) return;

    updateChatMessages({ sender: "user", text: input });
    setLoading(true);

    let botReply = "";

    try {
      const res = await axios.post(`${API_URL}/chat`, { message: input });
      botReply = res.data.reply;
      updateChatMessages({ sender: "bot", text: botReply });
    } catch {
      updateChatMessages({
        sender: "bot",
        text: "⚠️ AI service failed. Try again.",
      });
      setLoading(false);
      return;
    }

    setLoading(false);

    if (isLoggedIn && activeChat?._id) {
      try {
        const token = localStorage.getItem("token");

        await axios.post(
          `${API_URL}/chats/${activeChat._id}/message`,
          { sender: "user", text: input },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        await axios.post(
          `${API_URL}/chats/${activeChat._id}/message`,
          { sender: "bot", text: botReply },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch {}
    }
  };

  if (!activeChatId) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        <p className="text-3xl md:text-4xl font-semibold">
          How can I help you?
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} msg={msg} />
        ))}

        {loading && (
          <div className="bg-gray-700 p-3 rounded-xl w-fit mr-auto animate-pulse">
            Fusion is thinking...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={sendMessage} />
    </div>
  );
}
