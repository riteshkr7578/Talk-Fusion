import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MessageBubble({ msg }) {
  const [copied, setCopied] = useState(false);

  const copy = async (text) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className={`relative group max-w-[75%] p-3 rounded-xl ${
        msg.sender === "user"
          ? "bg-blue-600 ml-auto"
          : "bg-gray-700 mr-auto"
      }`}
    >
      {msg.sender === "bot" && (
        <button
          onClick={() => copy(msg.text)}
          className="absolute top-2 right-2 text-xs bg-gray-800 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      )}

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, children }) {
            if (inline) {
              return (
                <code className="bg-gray-800 px-1 rounded text-sm">
                  {children}
                </code>
              );
            }
            return (
              <pre className="bg-black text-green-400 p-3 rounded-lg overflow-x-auto text-sm">
                <code>{children}</code>
              </pre>
            );
          },
        }}
      >
        {msg.text}
      </ReactMarkdown>
    </div>
  );
}
