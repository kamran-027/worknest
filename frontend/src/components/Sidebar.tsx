import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-full p-4">
      <h2 className="text-lg font-semibold mb-4">Dashboard</h2>
      <nav className="space-y-2">
        <Link to="/dashboard" className="block p-2 rounded hover:bg-gray-700">
          Home
        </Link>
        <Link to="/saved-jobs" className="block p-2 rounded hover:bg-gray-700">
          Saved Jobs
        </Link>
        <Link
          to="/applications"
          className="block p-2 rounded hover:bg-gray-700"
        >
          My Applications
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
