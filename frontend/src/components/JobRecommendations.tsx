import { useState, useEffect } from "react";
import useJobActions from "../hooks/useJobActions";
import { Job } from "../types/Job";
import axios from "axios";
import JobCard from "../components/JobCard";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const JobRecommendations = () => {
  const { applyJob, saveJob } = useJobActions();
  const [recommendedJobs, setRecommendedJobs] = useState<Job[]>([]);

  const fetchRecommendedJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BACKEND_URL}/api/jobs/recommendations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecommendedJobs(response.data.recommendations);
    } catch (error) {
      console.error("Error fetching recommended jobs:", error);
    }
  };

  useEffect(() => {
    fetchRecommendedJobs();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Recommended for You</h2>
      <div className="mt-6 space-y-6">
        {recommendedJobs.length > 0 ? (
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
          <p className="text-gray-600">No recommendations available at the moment</p>
        )}
      </div>
    </div>
  );
};

export default JobRecommendations;
