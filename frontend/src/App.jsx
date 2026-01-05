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

  // ONLY STATE
  const [chats, setChats] = useState([]);

  const activeChat = chats[0] || null;

  /* session */
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  /* load chats */
  useEffect(() => {
    if (!isLoggedIn) {
      setChats([
        {
          id: crypto.randomUUID(),
          title: "New Chat",
          messages: [],
        },
      ]);
      return;
    }

    const load = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/api/chats`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.length === 0) {
        const create = await axios.post(
          `${API_URL}/api/chats`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setChats([create.data]);
      } else {
        setChats(res.data);
      }
    };

    load();
  }, [isLoggedIn]);

  /* create chat */
  const createNewChat = async () => {
    if (!isLoggedIn) {
      setChats((prev) => [
        {
          id: crypto.randomUUID(),
          title: "New Chat",
          messages: [],
        },
        ...prev,
      ]);
      return;
    }

    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${API_URL}/api/chats`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setChats((prev) => [res.data, ...prev]);
  };

  /* select chat */
  const selectChat = (id) => {
    setChats((prev) => {
      const idx = prev.findIndex(
        (c) => String(c._id || c.id) === String(id)
      );
      if (idx === -1) return prev;

      const selected = prev[idx];
      const rest = prev.filter((_, i) => i !== idx);
      return [selected, ...rest];
    });

    setSidebarOpen(false);
  };

  /* logout */
  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setChats([]);
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
          onSelectChat={selectChat}
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
          activeChat={activeChat}
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
