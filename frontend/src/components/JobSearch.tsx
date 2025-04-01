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
      setJobs((prevJobs) => prevJobs.map((job) => (job._id === jobId ? { ...job, isSaved: !isSaved } : job)));
    });
  };

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const url = query ? `${BACKEND_URL}/api/jobs?search=${query}` : `${BACKEND_URL}/api/jobs`;

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
    <div className="p-6 bg-white">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Find Your Dream Job</h2>
      <Input
        label="Search Jobs"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type job title or keyword..."
        className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-indigo-400"
      />
      <div className="mt-6 space-y-6">
        {loading ? (
          <div className="mt-6 space-y-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="animate-pulse p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 space-y-6">
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
                  onApply={() => applyJob(job._id)}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center">No jobs found. Try a different search term.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobSearch;
