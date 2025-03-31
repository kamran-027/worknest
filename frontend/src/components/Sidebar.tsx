import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-6">
      <h2 className="text-xl font-bold">WorkNest</h2>
      <nav className="mt-6">
        <ul>
          <li className="mb-4">
            <Link to="/dashboard" className="hover:text-gray-400">
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/jobs" className="hover:text-gray-400">
              Jobs
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/applications" className="hover:text-gray-400">
              Applications
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
