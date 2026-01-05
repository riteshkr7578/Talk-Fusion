import { useState } from "react";
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "https://talk-fusion.onrender.com";

export default function ChatSidebar({
  chats,
  onSelectChat,
  onNewChat,
  setChats,
  isLoggedIn,
  isOpen,
  onClose,
}) {
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");

  const renameChat = async (id) => {
    const newTitle = title.trim();
    if (!newTitle) return setEditingId(null);

    if (!isLoggedIn) {
      setChats((prev) =>
        prev.map((c) =>
          String(c.id) === String(id) ? { ...c, title: newTitle } : c
        )
      );
      setEditingId(null);
      return;
    }

    const token = localStorage.getItem("token");
    const res = await axios.patch(
      `${API_URL}/api/chats/${id}`,
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

  const deleteChat = async (id) => {
    if (!isLoggedIn) {
      setChats((prev) => prev.filter((c) => c.id !== id));
      return;
    }

    const token = localStorage.getItem("token");
    await axios.delete(`${API_URL}/api/chats/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setChats((prev) => prev.filter((c) => c._id !== id));
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed md:static z-50
          top-0 left-0 h-full w-64
          bg-gray-900 border-r border-gray-800
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 transition-transform
        `}
      >
        <div className="p-4 border-b border-gray-800">
          <button
            onClick={onNewChat}
            className="w-full bg-blue-600 py-2 rounded-lg font-semibold"
          >
            + New Chat
          </button>
        </div>

        <div className="p-2 space-y-1 overflow-y-auto">
          {chats.map((chat, idx) => {
            const id = chat._id || chat.id;
            const isActive = idx === 0;

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
                    onBlur={() => renameChat(id)}
                    autoFocus
                    className="flex-1 bg-gray-700 px-2 py-1 rounded"
                  />
                ) : (
                  <button
                    onClick={() => onSelectChat(id)}
                    className="flex-1 text-left truncate"
                  >
                    {chat.title || "New Chat"}
                  </button>
                )}

                <button
                  onClick={() => {
                    setEditingId(id);
                    setTitle(chat.title || "");
                  }}
                >
                  ✏️
                </button>

                <button onClick={() => deleteChat(id)}>🗑️</button>
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}
