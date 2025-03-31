import { useEffect, useState } from "react";
import useJobActions from "../hooks/useJobActions";
import JobCard from "./JobCard";
import { Job } from "../types/Job";
import { useAtom } from "jotai";
import { searchQueryAtom } from "../atoms/searchQueryAtom";
import Input from "./ui/Input";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const JobSearch = () => {
  const [query, setQuery] = useAtom(searchQueryAtom);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const { saveJob, applyJob } = useJobActions();

  // Handle saving/un-saving a job
  const toggleSaveJob = (jobId: string, isSaved: boolean) => {
    saveJob(jobId, isSaved, () => {
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId ? { ...job, isSaved: !isSaved } : job
        )
      );
    });
  };

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const url = query
          ? `${BACKEND_URL}/api/jobs?search=${query}`
          : `${BACKEND_URL}/api/jobs`;

        const response = await axios.get(url, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });

        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchJobs, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="p-4">
      <Input
        label="Search Jobs"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type job title or keyword..."
      />
      {loading && <p className="mt-2 text-gray-500">Loading jobs...</p>}
      <div className="mt-4 space-y-4">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard
              key={job._id}
              title={job.title}
              company={job.company}
              location={job.location}
              description={job.description}
              isSaved={job.isSaved}
              isApplied={false}
              onSave={() => toggleSaveJob(job._id, job.isSaved)}
              onApply={() =>
                applyJob(job._id, () => console.log("Applied to job"))
              }
            />
          ))
        ) : (
          <p className="text-gray-600">No jobs found</p>
        )}
      </div>
    </div>
  );
};

export default JobSearch;
