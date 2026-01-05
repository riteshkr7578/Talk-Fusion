import { useEffect, useRef, useState } from "react";
import axios from "axios";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

const API_URL =
  import.meta.env.VITE_API_URL || "https://talk-fusion.onrender.com";

export default function ChatWindow({
  isLoggedIn,
  chats,
  setChats,
  activeChat,
}) {
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const messages = activeChat?.messages || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const updateChatMessages = (msg) => {
    if (!activeChat) return;

    setChats((prev) =>
      prev.map((chat) => {
        const chatId = chat._id || chat.id;
        const activeId = activeChat._id || activeChat.id;

        if (chatId !== activeId) return chat;

        const isFirstUserMessage =
          chat.messages.length === 0 && msg.sender === "user";

        return {
          ...chat,
          title:
            isFirstUserMessage && (!chat.title || chat.title === "New Chat")
              ? msg.text.trim().slice(0, 30)
              : chat.title,
          messages: [...chat.messages, msg],
        };
      })
    );
  };


  const sendMessage = async (input) => {
    if (!input.trim() || !activeChat) return;

    updateChatMessages({ sender: "user", text: input });
    setLoading(true);

    let reply = "";
    try {
      const history = messages.map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      }));

      const res = await axios.post(`${API_URL}/chat`, {
        message: input,
        history,
      });

      reply = res.data.reply;
      updateChatMessages({ sender: "bot", text: reply });
    } catch {
      updateChatMessages({
        sender: "bot",
        text: "⚠️ AI service failed.",
      });
    }

    setLoading(false);

    if (isLoggedIn && activeChat._id) {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/api/chats/${activeChat._id}/message`,
        { sender: "user", text: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await axios.post(
        `${API_URL}/api/chats/${activeChat._id}/message`,
        { sender: "bot", text: reply },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && !loading ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-3xl md:text-5xl font-semibold text-gray-400 text-center">
              How can I help you?
            </p>
          </div>
        ) : (
          <>
            {messages.map((m, i) => (
              <MessageBubble key={i} msg={m} />
            ))}
            {loading && <p className="animate-pulse">Fusion is thinking…</p>}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <ChatInput onSend={sendMessage} />
    </div>
  );
}
