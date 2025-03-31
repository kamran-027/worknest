import { Routes, Route, useNavigate } from "react-router-dom";
import { JSX, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import JobSearch from "../components/JobSearch";
import SavedJobs from "../components/SavedJobs";
// import Applications from "../components/Applications";
import AppBar from "../components/Appbar";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Redirect to login if no token
    }
  }, [user, navigate]);

  return (
    <div className="flex h-screen flex-col">
      <AppBar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<JobSearch />} />
            <Route path="saved-jobs" element={<SavedJobs />} />
            {/* <Route path="/dashboard/applications" element={<Applications />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
