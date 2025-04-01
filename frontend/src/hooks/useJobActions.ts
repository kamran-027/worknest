import { useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const useJobActions = () => {
  const [loading, setLoading] = useState(false);

  const saveJob = async (jobId: string, isSaved: boolean, onSuccess?: () => void) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (isSaved) {
        await axios.delete(`${BACKEND_URL}/api/jobs/${jobId}/save`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(
          `${BACKEND_URL}/api/jobs/${jobId}/save`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      onSuccess?.();
    } catch (error) {
      console.error("Error saving job:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyJob = async (jobId: string, onSuccess?: () => void) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${BACKEND_URL}/api/jobs/${jobId}/apply`, {}, { headers: { Authorization: `Bearer ${token}` } });

      onSuccess?.();
    } catch (error) {
      console.error("Error applying to job:", error);
    } finally {
      setLoading(false);
    }
  };

  return { saveJob, applyJob, loading };
};

export default useJobActions;
