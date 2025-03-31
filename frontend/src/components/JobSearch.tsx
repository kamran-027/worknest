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

  useEffect(() => {
    if (!query) {
      setJobs([]);
      return;
    }

    const token = localStorage.getItem("token");
    setLoading(true);

    const handler = setTimeout(async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/jobs?search=${query}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          }
        );
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    }, 300); // Debounce time: 300ms

    return () => clearTimeout(handler); // Cleanup previous timeout
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
              onSave={() => console.log("Save job", job._id)}
              onApply={() => console.log("Apply job", job._id)}
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
