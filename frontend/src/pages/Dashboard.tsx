import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import JobSearch from "../components/JobSearch";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Welcome, {user.name}</h1>
          <button
            onClick={logout}
            className="p-2 bg-red-500 text-white rounded-md"
          >
            Logout
          </button>
        </div>
        <JobSearch />
      </div>
    </div>
  );
};

export default Dashboard;
