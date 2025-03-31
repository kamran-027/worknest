import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <Outlet /> {/* Renders the respective page component */}
      </div>
    </div>
  );
};

export default DashboardLayout;
