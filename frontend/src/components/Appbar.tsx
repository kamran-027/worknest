import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AppBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center px-6 py-3 bg-opacity-80 backdrop-blur-md shadow-lg fixed top-0 left-0 right-0 z-50 bg-[#1E1E1E] text-white h-16">
      {/* App Name */}
      <h1 className="text-2xl font-semibold tracking-tight text-gray-200 cursor-pointer" onClick={() => navigate("/dashboard")}>
        WorkNest
      </h1>

      {/* Tagline (subtle and aligned to the right) */}
      <div className="text-xs sm:text-sm text-gray-300 hidden sm:block">Your gateway to career growth.</div>

      {/* User Info & Logout */}
      <div className="flex items-center gap-6">
        <span className="text-sm sm:text-base font-medium text-gray-300">Welcome, {user?.name || "User"}</span>
        <button
          onClick={logout}
          className="px-4 py-2 cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded-full text-sm font-medium shadow-md transition-transform transform hover:scale-105"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default AppBar;
