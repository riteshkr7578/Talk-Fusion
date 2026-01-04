import { useState, useEffect } from "react";
import Header from "./components/layout/Header";
import ChatWindow from "./components/chat/ChatWindow";
import Modal from "./components/common/Modal";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div className="w-full h-screen bg-gray-900 text-white flex flex-col">
      <Header
        isLoggedIn={isLoggedIn}
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

      <ChatWindow />

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
