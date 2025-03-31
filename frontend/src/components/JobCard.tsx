import { FC } from "react";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  description: string;
  isSaved: boolean;
  isApplied: boolean;
  onSave: () => void;
  onApply: () => void;
}

const JobCard: FC<JobCardProps> = ({
  title,
  company,
  location,
  description,
  isSaved,
  onSave,
  onApply,
  isApplied,
}) => {
  return (
    <div className="p-4 border rounded-md shadow-md">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-600">
        {company} - {location}
      </p>
      <p className="text-sm mt-2">{description}</p>
      <div className="mt-3 flex gap-2">
        <button
          className={`px-3 py-1 text-sm rounded-md ${
            isSaved ? "bg-gray-400" : "bg-blue-500 text-white"
          }`}
          onClick={onSave}
        >
          {isSaved ? "Saved" : "Save Job"}
        </button>
        {!isApplied && (
          <button
            className="px-3 py-1 bg-green-500 text-white text-sm rounded-md"
            onClick={onApply}
          >
            Apply
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;
