export default function ChatSidebar({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  isOpen,
  onClose,
}) {
  const handleNewChat = async () => {
    const id = await onNewChat();
    if (id) onSelectChat(id);
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      <aside
        className={`fixed md:static z-50 md:z-auto
        top-0 left-0 h-full w-64 bg-gray-900 border-r border-gray-800
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 flex flex-col`}
      >
        <div className="p-4 border-b border-gray-800">
          <button
            onClick={handleNewChat}
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-sm font-semibold"
          >
            + New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
          {chats.map((chat) => {
            const id = chat._id || chat.id;

            return (
              <button
                key={id}
                onClick={() => onSelectChat(id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm truncate ${
                  String(id) === String(activeChatId)
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                {chat.title || "New Chat"}
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
}