import { Link, useLocation } from "react-router-dom";
import { JSX, useState } from "react";
import { FiHome, FiHeart, FiBriefcase, FiMenu, FiX, FiStar } from "react-icons/fi";

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`h-screen bg-[#1e1e1e] text-white shadow-xl transition-all ${isCollapsed ? "w-20" : "w-64"} relative p-4`}>
      {/* Toggle Button */}
      <button className="absolute top-4 right-4 text-gray-400 hover:text-white" onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? <FiMenu size={24} /> : <FiX size={24} />}
      </button>

      {/* Logo */}
      {!isCollapsed && <h2 className="text-2xl font-mono text-gray-200 tracking-tight mb-8">Dashboard</h2>}

      {/* Navigation */}
      <nav className="flex flex-col space-y-3 mt-6">
        <SidebarLink to="/dashboard" label="Home" icon={<FiHome />} isCollapsed={isCollapsed} activePath={location.pathname} />
        <SidebarLink
          to="/dashboard/saved-jobs"
          label="Saved Jobs"
          icon={<FiHeart />}
          isCollapsed={isCollapsed}
          activePath={location.pathname}
        />
        <SidebarLink
          to="/dashboard/applications"
          label="My Applications"
          icon={<FiBriefcase />}
          isCollapsed={isCollapsed}
          activePath={location.pathname}
        />
        <SidebarLink
          to="/dashboard/recommendations"
          label="My Recommendations"
          icon={<FiStar />}
          isCollapsed={isCollapsed}
          activePath={location.pathname}
        />
      </nav>
    </aside>
  );
};

const SidebarLink = ({
  to,
  label,
  icon,
  isCollapsed,
  activePath,
}: {
  to: string;
  label: string;
  icon: JSX.Element;
  isCollapsed: boolean;
  activePath: string;
}) => {
  const isActive = activePath === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
        isActive
          ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium shadow-md"
          : "text-gray-300 hover:bg-gray-700 hover:text-white"
      }`}
    >
      {icon}
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
};

export default Sidebar;
