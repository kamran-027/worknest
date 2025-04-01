import { useEffect, useState } from "react";
import useJobActions from "../hooks/useJobActions";
import { Job } from "../types/Job";
import JobCard from "./JobCard";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const SavedJobs = () => {
  const { saveJob, applyJob } = useJobActions();
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Remove job from saved list after un-saving
  const handleUnsaveJob = (jobId: string) => {
    saveJob(jobId, true, () => {
      setSavedJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    });
  };

  const getSavedJobs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BACKEND_URL}/api/jobs/saved-jobs`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      setSavedJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSavedJobs();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Saved Jobs</h2>

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
      ) : (
        savedJobs.map((job) => (
          <JobCard
            key={job._id}
            title={job.title}
            company={job.company}
            location={job.location}
            description={job.description}
            isSaved={true}
            isApplied={false}
            onSave={() => handleUnsaveJob(job._id)}
            onApply={() => applyJob(job._id, () => console.log("Applied to job"))}
          />
        ))
      )}
    </div>
  );
};

export default SavedJobs;
