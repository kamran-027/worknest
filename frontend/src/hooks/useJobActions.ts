import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const useJobActions = () => {
  const [loading, setLoading] = useState(false);

  const saveJob = async (jobId: string, isSaved: boolean, onSuccess?: () => void) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (isSaved) {
        await axios.post(`${BACKEND_URL}/api/jobs/${jobId}/save`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        onSuccess?.();
        toast.success("Job removed from saved jobs!");
      } else {
        await axios.post(`${BACKEND_URL}/api/jobs/${jobId}/save`, {}, { headers: { Authorization: `Bearer ${token}` } });
        toast.success("Job saved successfully!");
      }
    } catch (error) {
      console.error("Error saving job:", error);
      toast.error("Failed to save job. Please try again.");
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
      toast.success("Job application submitted successfully!");
    } catch (error) {
      console.error("Error applying to job:", error);
      toast.error("Failed to apply. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { saveJob, applyJob, loading };
};

export default useJobActions;
