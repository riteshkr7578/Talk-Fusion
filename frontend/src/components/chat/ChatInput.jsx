import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    onSend(input);
    setInput("");
  };

  return (
    <div className="p-4 bg-gray-800 flex gap-2">
      <input
        className="flex-1 p-3 rounded-lg bg-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        onClick={handleSend}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg"
      >
        Send
      </button>
    </div>
  );
}
