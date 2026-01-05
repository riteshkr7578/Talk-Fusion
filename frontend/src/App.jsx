import { useState, useEffect } from "react";
import axios from "axios";

import Header from "./components/layout/Header";
import ChatWindow from "./components/chat/ChatWindow";
import ChatSidebar from "./components/chat/ChatSidebar";
import Modal from "./components/common/Modal";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setChats([]);
    setActiveChatId(null);
  };

  const createNewChat = async () => {
    if (!isLoggedIn) {
      const id = crypto.randomUUID();
      setChats((prev) => [{ id, title: "New Chat", messages: [] }, ...prev]);
      setActiveChatId(id);
      return id;
    }

    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${API_URL}/api/chats`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setChats((prev) => [res.data, ...prev]);
    setActiveChatId(res.data._id);
    return res.data._id;
  };

  useEffect(() => {
    if (!isLoggedIn) return;

    const loadChats = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/api/chats`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setChats(res.data);
      setActiveChatId(res.data[0]?._id || null);
    };

    loadChats();
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn && chats.length === 0) {
      createNewChat();
    }
  }, [isLoggedIn, chats.length]);

  return (
    <div className="w-full h-screen bg-gray-900 text-white flex flex-col">
      <Header
        isLoggedIn={isLoggedIn}
        onMenuClick={() => setSidebarOpen(true)}
        onLogin={() => {
          setShowLogin(true);
          setShowSignup(false);
        }}
        onSignup={() => {
          setShowSignup(true);
          setShowLogin(false);
        }}
        onLogout={handleLogout}
      />

      <div className="flex flex-1 overflow-hidden">
       <ChatSidebar
  chats={chats}
  activeChatId={activeChatId}
  onSelectChat={(id) => {
    setActiveChatId(id);
    setSidebarOpen(false);
  }}
  onNewChat={createNewChat}
  setChats={setChats}
  isLoggedIn={isLoggedIn}
  isOpen={sidebarOpen}
  onClose={() => setSidebarOpen(false)}
/>


        <ChatWindow
          isLoggedIn={isLoggedIn}
          chats={chats}
          setChats={setChats}
          activeChatId={activeChatId}
        />
      </div>

      {showLogin && (
        <Modal onClose={() => setShowLogin(false)}>
          <Login onSuccess={handleLoginSuccess} />
        </Modal>
      )}

      {showSignup && (
        <Modal onClose={() => setShowSignup(false)}>
          <Signup onSuccess={() => setShowSignup(false)} />
        </Modal>
      )}
    </div>
  );
}
