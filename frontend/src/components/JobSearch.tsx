import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import axios from "axios";
import Input from "./ui/Input";
import JobCard from "./JobCard";
import { searchQueryAtom } from "../atoms/searchQueryAtom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  isSaved: boolean;
}

const JobSearch = () => {
  const [query, setQuery] = useAtom(searchQueryAtom);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

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

  // Save a job
  const handleSaveJob = async (jobId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${BACKEND_URL}/api/jobs/${jobId}/save`, // Need to implement this in backend
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId ? { ...job, isSaved: !job.isSaved } : job
        )
      );
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  const handleApplyJob = async (jobId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${BACKEND_URL}/api/jobs/${jobId}/apply`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Application submitted!");
    } catch (error) {
      console.error("Error applying for job:", error);
    }
  };

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
              onSave={() => handleSaveJob(job._id)}
              onApply={() => handleApplyJob(job._id)}
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
