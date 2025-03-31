import { FC } from "react";
import {
  FiBriefcase,
  FiMapPin,
  FiBookmark,
  FiCheckCircle,
} from "react-icons/fi";
import { BsBookmarkFill, BsCheckCircleFill } from "react-icons/bs";

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
    <div className="group flex flex-col bg-white p-4 sm:p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out">
      {/* Header Section */}
      <div className="mb-2">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
          {title}
        </h2>

        <div className="mt-1.5 flex flex-col sm:flex-row sm:items-center sm:gap-3 text-xs sm:text-sm text-gray-600">
          <p className="flex items-center gap-1">
            <FiBriefcase
              className="h-3.5 w-3.5 text-gray-400"
              aria-hidden="true"
            />
            {company}
          </p>
          <p className="flex items-center gap-1 mt-0.5 sm:mt-0">
            <FiMapPin
              className="h-3.5 w-3.5 text-gray-400"
              aria-hidden="true"
            />
            {location}
          </p>
        </div>
      </div>

      {/* Description Section */}
      <p className="text-sm text-gray-700 mb-3 line-clamp-3 flex-grow">
        {description}
      </p>

      {/* Footer/Actions Section */}
      <div className="mt-auto pt-3 border-t border-gray-100 flex flex-wrap items-center gap-2">
        <button
          onClick={onSave}
          disabled={isApplied}
          aria-label={isSaved ? "Unsave job" : "Save job"}
          className={`
            inline-flex items-center cursor-pointer gap-1 px-2.5 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ease-in-out
            ${
              isSaved
                ? "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500"
                : "bg-blue-100 text-blue-700 hover:bg-blue-200 focus:ring-blue-500"
            }
             ${isApplied ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
          `}
        >
          {isSaved ? (
            <BsBookmarkFill className="h-4 w-4" aria-hidden="true" />
          ) : (
            <FiBookmark className="h-4 w-4" aria-hidden="true" />
          )}
          {isSaved ? "Saved" : "Save"}
        </button>

        {!isApplied && (
          <button
            onClick={onApply}
            aria-label="Apply for this job" // Better accessibility
            className="inline-flex items-center cursor-pointer gap-1 px-2.5 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 ease-in-out"
          >
            <FiCheckCircle className="h-4 w-4" aria-hidden="true" />
            Apply Now
          </button>
        )}
        {isApplied && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md text-green-800 bg-green-100">
            <BsCheckCircleFill
              className="h-4 w-4 text-green-600"
              aria-hidden="true"
            />
            Applied
          </span>
        )}
      </div>
    </div>
  );
};

export default JobCard;
