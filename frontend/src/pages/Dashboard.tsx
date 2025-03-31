import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import JobSearch from "../components/JobSearch";
import SavedJobs from "../components/SavedJobs";
import AppBar from "../components/Appbar";
import MyApplications from "../components/MyApplications";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <AppBar />

      <div className="flex flex-1 overflow-hidden pt-16">
        {" "}
        {/* Adjust pt-16 based on AppBar height */}
        <Sidebar />
        <div className="flex-1 p-4 sm:p-6">
          <main className="h-full w-full overflow-y-auto rounded-lg bg-white p-6 shadow-md">
            <Routes>
              <Route path="/" element={<JobSearch />} />
              <Route path="saved-jobs" element={<SavedJobs />} />
              <Route path="applications" element={<MyApplications />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
