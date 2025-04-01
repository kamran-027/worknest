import { useState, useEffect } from "react";
import { getJobs } from "../services/jobSevice";
import { Job } from "../types/Job";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
      <ul>
        {jobs.map((job: Job) => (
          <li key={job._id} className="p-4 mb-2 border rounded-lg">
            <h2 className="text-lg font-semibold">{job.title}</h2>
            <p>{job.company}</p>
            <p>{job.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Jobs;
