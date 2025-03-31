import { useAuth } from "../context/AuthContext";

const AppBar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex justify-between items-center bg-gray-500 text-white p-4 shadow-md">
      <h1 className="text-lg font-semibold">WorkNest</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm">Welcome, {user?.name || "User"}</span>
        <button
          onClick={logout}
          className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AppBar;
