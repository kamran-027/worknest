import { useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const useJobActions = () => {
  const [loading, setLoading] = useState(false);

  // Save or Unsave a job
  const saveJob = async (
    jobId: string,
    isSaved: boolean,
    onSuccess?: () => void
  ) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (isSaved) {
        // UNSAVE Job (DELETE request)
        await axios.delete(`${BACKEND_URL}/api/jobs/${jobId}/save`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // SAVE Job (POST request)
        await axios.post(
          `${BACKEND_URL}/api/jobs/${jobId}/save`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      onSuccess?.(); // Update UI after success
    } catch (error) {
      console.error("Error saving job:", error);
    } finally {
      setLoading(false);
    }
  };

  // Apply to a job
  const applyJob = async (jobId: string, onSuccess?: () => void) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${BACKEND_URL}/api/jobs/${jobId}/apply`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      onSuccess?.(); // Update UI after success
    } catch (error) {
      console.error("Error applying to job:", error);
    } finally {
      setLoading(false);
    }
  };

  return { saveJob, applyJob, loading };
};

export default useJobActions;
