import { useState, useEffect } from "react";
import useJobActions from "../hooks/useJobActions";
import { Job } from "../types/Job";
import axios from "axios";
import JobCard from "../components/JobCard";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const JobRecommendations = () => {
  const { applyJob, saveJob } = useJobActions();
  const [recommendedJobs, setRecommendedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRecommendedJobs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BACKEND_URL}/api/jobs/recommendations`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      setRecommendedJobs(response.data.recommendations);
    } catch (error) {
      console.error("Error fetching recommended jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendedJobs();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Recommended for You</h2>
      <div className="mt-6 space-y-6">
        {loading ? (
          [...Array(3)].map((_, index) => (
            <div key={index} className="animate-pulse p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
          ))
        ) : recommendedJobs.length > 0 ? (
          recommendedJobs.map((job) => (
            <JobCard
              key={job._id}
              title={job.title}
              company={job.company}
              location={job.location}
              description={job.description}
              isSaved={job.isSaved}
              isApplied={false}
              onSave={() => saveJob(job._id, job.isSaved)}
              onApply={() => applyJob(job._id)}
            />
          ))
        ) : (
          <p className="text-gray-600 text-center">No recommendations available at the moment</p>
        )}
      </div>
    </div>
  );
};

export default JobRecommendations;
