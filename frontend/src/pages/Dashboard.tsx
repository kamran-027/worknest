import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import JobSearch from "../components/JobSearch";
import SavedJobs from "../components/SavedJobs";
import AppBar from "../components/Appbar";
import MyApplications from "../components/MyApplications";
import JobRecommendations from "../components/JobRecommendations";
import Footer from "../components/Footer";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col h-screen">
      <AppBar />

      <div className="flex flex-1 overflow-hidden pt-16">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto p-4 sm:p-6">
            <Routes>
              <Route path="/" element={<JobSearch />} />
              <Route path="saved-jobs" element={<SavedJobs />} />
              <Route path="applications" element={<MyApplications />} />
              <Route path="recommendations" element={<JobRecommendations />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
