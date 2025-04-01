import { useState, useEffect } from "react";
import { Job } from "../types/Job";
import axios from "axios";
import JobCard from "../components/JobCard";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const MyApplications = () => {
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAppliedJobs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BACKEND_URL}/api/jobs/applied-jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppliedJobs(response.data);
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Applications</h2>
      <div className="mt-6 space-y-6">
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="animate-pulse p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        ) : appliedJobs.length > 0 ? (
          appliedJobs.map((job) => (
            <JobCard
              key={job._id}
              title={job.title}
              company={job.company}
              location={job.location}
              description={job.description}
              isSaved={false}
              isApplied={true}
              onSave={() => {}}
              onApply={() => {}}
            />
          ))
        ) : (
          <p className="text-gray-600">No applications yet</p>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
