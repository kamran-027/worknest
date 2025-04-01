import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import worknest from "../assets/worknest.svg";

const AppBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header
      className="flex justify-between items-center px-6 py-3 bg-[#161616] 
                 border-b border-gray-700 shadow-md fixed top-0 left-0 right-0 z-50 h-16"
    >
      {/* Left: Logo & Title */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/dashboard")}>
        <img src={worknest} alt="WorkNest Logo" className="h-9 w-9" />
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold text-gray-300">WorkNest</h1>
          <span className="text-xs text-gray-400">Your gateway to career growth</span>
        </div>
      </div>

      {/* Right: User Info & Logout */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-400 hidden sm:block">Welcome, {user?.name || "User"}</span>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md 
                     text-sm font-medium shadow transition-transform transform hover:scale-105"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default AppBar;
