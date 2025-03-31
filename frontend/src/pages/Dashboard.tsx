import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import JobSearch from "../components/JobSearch";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Redirect if no token
    }
  }, [user, navigate]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Welcome, {user?.name}</h1>
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
