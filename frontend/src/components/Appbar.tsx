import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import worknest from "../assets/worknest.svg";

const AppBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center px-6 py-3 bg-opacity-80 backdrop-blur-md shadow-lg fixed top-0 left-0 right-0 z-50 bg-[#1E1E1E] text-white h-16">
      {/* App Name and Logo */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/dashboard")}>
        <img src={worknest} alt="WorkNest Logo" className="h-8 w-8" />
        <h1 className="text-2xl font-semibold tracking-tight text-gray-200">WorkNest</h1>
      </div>

      {/* Description inline with title */}
      <div className="text-xs sm:text-sm text-gray-300 hidden sm:block">Your gateway to career growth</div>

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
