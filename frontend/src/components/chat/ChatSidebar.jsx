export default function ChatSidebar({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
}) {
  return (
    <aside className="hidden md:flex w-64 bg-gray-800 border-r border-gray-700 flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <button
          onClick={onNewChat}
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-sm font-medium"
        >
          + New Chat
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {chats.length === 0 && (
          <p className="text-gray-400 text-sm text-center mt-4">
            No chats yet
          </p>
        )}

        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`w-full text-left px-3 py-2 rounded text-sm truncate ${
              activeChatId === chat.id
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            {chat.title}
          </button>
        ))}
      </div>
    </aside>
  );
}
