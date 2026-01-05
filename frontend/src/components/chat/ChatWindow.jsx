import { useEffect, useRef, useState, useMemo } from "react";
import axios from "axios";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

const API_URL =
  import.meta.env.VITE_API_URL || "https://talk-fusion.onrender.com";

export default function ChatWindow({
  isLoggedIn,
  chats,
  setChats,
  activeChatId,
}) {
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const activeChat = useMemo(
    () =>
      chats.find(
        (c) => String(c._id || c.id) === String(activeChatId)
      ),
    [chats, activeChatId]
  );

  const messages = activeChat?.messages ?? [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const updateChatMessages = (newMessage) => {
    setChats((prev) =>
      prev.map((chat) =>
        String(chat._id || chat.id) === String(activeChatId)
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

    try {
      const history = messages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      }));

      const res = await axios.post(`${API_URL}/chat`, {
        message: input,
        history,
      });

      updateChatMessages({ sender: "bot", text: res.data.reply });
    } catch {
      updateChatMessages({
        sender: "bot",
        text: "⚠️ AI service failed. Try again.",
      });
    }

    setLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* CONTENT AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && !loading ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-3xl md:text-4xl font-semibold text-gray-400 text-center">
              How can I help you?
            </p>
          </div>
        ) : (
          <>
            {messages.map((msg, idx) => (
              <MessageBubble key={idx} msg={msg} />
            ))}

            {loading && (
              <div className="bg-gray-700 p-3 rounded-xl w-fit mr-auto animate-pulse">
                Fusion is thinking...
              </div>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* INPUT AREA */}
      <div className="p-4 border-t border-gray-800 bg-gray-900">
        <ChatInput onSend={sendMessage} />
      </div>
    </div>
  );
}
