import { useState } from "react";
import useJobActions from "../hooks/useJobActions";
import { Job } from "../types/Job";
import JobCard from "./JobCard";

const SavedJobs = () => {
  const { saveJob, applyJob } = useJobActions();
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);

  // Remove job from saved list after un-saving
  const handleUnsaveJob = (jobId: string) => {
    saveJob(jobId, true, () => {
      setSavedJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Saved Jobs</h2>
      {savedJobs.map((job) => (
        <JobCard
          key={job._id}
          title={job.title}
          company={job.company}
          location={job.location}
          description={job.description}
          isSaved={true}
          onSave={() => handleUnsaveJob(job._id)}
          onApply={() => applyJob(job._id, () => console.log("Applied to job"))}
        />
      ))}
    </div>
  );
};

export default SavedJobs;
