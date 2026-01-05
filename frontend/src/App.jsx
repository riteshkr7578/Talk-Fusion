import { useState, useEffect } from "react";
import axios from "axios";

import Header from "./components/layout/Header";
import ChatWindow from "./components/chat/ChatWindow";
import ChatSidebar from "./components/chat/ChatSidebar";
import Modal from "./components/common/Modal";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Footer from "./components/layout/Footer";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  // 🔐 Check session once
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // 📥 Load chats after login
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

  // 👤 Guest → ensure one chat
  useEffect(() => {
    if (!isLoggedIn && chats.length === 0) {
      const id = crypto.randomUUID();
      setChats([{ id, title: "New Chat", messages: [] }]);
      setActiveChatId(id);
    }
  }, [isLoggedIn, chats.length]);

  const createNewChat = async () => {
    if (!isLoggedIn) {
      const id = crypto.randomUUID();
      setChats((p) => [{ id, title: "New Chat", messages: [] }, ...p]);
      setActiveChatId(id);
      return;
    }

    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${API_URL}/api/chats`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setChats((p) => [res.data, ...p]);
    setActiveChatId(res.data._id);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setChats([]);
    setActiveChatId(null);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      <Header
        isLoggedIn={isLoggedIn}
        onMenuClick={() => setSidebarOpen(true)}
        onLogin={() => setShowLogin(true)}
        onSignup={() => setShowSignup(true)}
        onLogout={logout}
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

      <Footer />

    {showLogin && (
  <Modal onClose={() => setShowLogin(false)}>
    <Login
      onSuccess={() => {
        setIsLoggedIn(true);
        setShowLogin(false);
      }}
    />
  </Modal>
)}

      {showSignup && (
        <Modal onClose={() => setShowSignup(false)}>
          <Signup />
        </Modal>
      )}
    </div>
  );
}
