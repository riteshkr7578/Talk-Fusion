import { useState } from "react";
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "https://talk-fusion.onrender.com";

export default function ChatSidebar({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  setChats,
  isLoggedIn,
  isOpen,
  onClose,
}) {
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");

  const renameChat = async (chatId) => {
    const newTitle = title.trim();
    if (!newTitle) {
      setEditingId(null);
      return;
    }

    if (!isLoggedIn) {
      setChats((prev) =>
        prev.map((c) =>
          String(c.id) === String(chatId)
            ? { ...c, title: newTitle }
            : c
        )
      );
      setEditingId(null);
      return;
    }

    const token = localStorage.getItem("token");

    const res = await axios.patch(
      `${API_URL}/api/chats/${chatId}`,
      { title: newTitle },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setChats((prev) =>
      prev.map((c) =>
        String(c._id) === String(res.data._id) ? res.data : c
      )
    );

    setEditingId(null);
  };

  const deleteChat = async (chatId) => {
    if (!isLoggedIn) {
      setChats((prev) => {
        const filtered = prev.filter((c) => c.id !== chatId);
        onSelectChat(filtered[0]?.id || null);
        return filtered;
      });
      return;
    }

    const token = localStorage.getItem("token");

    await axios.delete(`${API_URL}/api/chats/${chatId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setChats((prev) => {
      const filtered = prev.filter((c) => c._id !== chatId);
      onSelectChat(filtered[0]?._id || null);
      return filtered;
    });
  };

  return (
    <>
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static z-50
          top-0 left-0 h-full
          w-64 bg-gray-900 border-r border-gray-800
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          flex flex-col
        `}
      >
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <button
            onClick={onNewChat}
            className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-sm font-semibold"
          >
            + New Chat
          </button>

          {/* Close button (mobile only) */}
          <button
            onClick={onClose}
            className="ml-2 text-gray-400 hover:text-white md:hidden"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
          {chats.map((chat) => {
            const id = chat._id || chat.id;
            const isActive = String(id) === String(activeChatId);

            return (
              <div
                key={id}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                  isActive ? "bg-gray-800" : "hover:bg-gray-800"
                }`}
              >
                {editingId === id ? (
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") renameChat(id);
                      if (e.key === "Escape") setEditingId(null);
                    }}
                    onBlur={() => renameChat(id)}
                    className="flex-1 bg-gray-700 px-2 py-1 rounded text-sm outline-none"
                    autoFocus
                  />
                ) : (
                  <button
                    onClick={() => onSelectChat(id)}
                    className="flex-1 text-left truncate text-sm"
                  >
                    {chat.title || "New Chat"}
                  </button>
                )}

                <button
                  onClick={() => {
                    setEditingId(id);
                    setTitle(chat.title || "");
                  }}
                  className="text-xs text-gray-400 hover:text-white"
                >
                  ✏️
                </button>

                <button
                  onClick={() => deleteChat(id)}
                  className="text-xs text-red-400 hover:text-red-600"
                >
                  🗑️
                </button>
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}
