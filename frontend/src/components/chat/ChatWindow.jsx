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

  const wasEmpty = messages.length === 0;

  updateChatMessages({ sender: "user", text: input });
  setLoading(true);

  let botReply = "";

  try {
    const history = messages.map((m) => ({
      role: m.sender === "user" ? "user" : "assistant",
      content: m.text,
    }));

    const res = await axios.post(`${API_URL}/chat`, {
      message: input,
      history,
    });

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

  // 🔐 Save to DB (logged-in only)
  if (isLoggedIn && activeChat?._id) {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${API_URL}/api/chats/${activeChat._id}/message`,
        { sender: "user", text: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await axios.post(
        `${API_URL}/api/chats/${activeChat._id}/message`,
        { sender: "bot", text: botReply },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch {
      // silent fail (UI already updated)
    }
  }

  // 🆕 Auto-create next chat ONLY AFTER first message-response
  if (wasEmpty) {
    if (isLoggedIn) {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_URL}/api/chats`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setChats((prev) => [res.data, ...prev]);
      setActiveChatId(res.data._id);
    } else {
      const id = crypto.randomUUID();
      setChats((prev) => [
        { id, title: "New Chat", messages: [] },
        ...prev,
      ]);
      setActiveChatId(id);
    }
  }
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
