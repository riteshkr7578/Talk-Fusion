export default function Header({
  isLoggedIn,
  onLogin,
  onSignup,
  onLogout,
  onMenuClick,
}) {
  return (
    <header className="p-4 bg-gray-800 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden text-xl text-gray-300 hover:text-white"
        >
          ☰
        </button>

        <h1 className="text-lg font-semibold">TalkFusion 🤖</h1>
      </div>

      {!isLoggedIn ? (
        <div className="space-x-2">
          <button
            onClick={onLogin}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            Login
          </button>
          <button
            onClick={onSignup}
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
          >
            Signup
          </button>
        </div>
      ) : (
        <button
          onClick={onLogout}
          className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
        >
          Logout
        </button>
      )}
    </header>
  );
}
