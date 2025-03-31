import { useState, useEffect } from "react";
import useJobActions from "../hooks/useJobActions";
import { Job } from "../types/Job";
import axios from "axios";
import JobCard from "../components/JobCard";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const MyApplications = () => {
  const { applyJob } = useJobActions();
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);

  const fetchAppliedJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BACKEND_URL}/api/jobs/applied-jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppliedJobs(response.data);
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Applications</h2>
      {appliedJobs.length > 0 ? (
        appliedJobs.map((job) => (
          <JobCard
            key={job._id}
            title={job.title}
            company={job.company}
            location={job.location}
            description={job.description}
            isSaved={false}
            onSave={() => {}}
            onApply={() =>
              applyJob(job._id, () => console.log("Already applied"))
            }
          />
        ))
      ) : (
        <p className="text-gray-600">No applications yet</p>
      )}
    </div>
  );
};

export default MyApplications;
