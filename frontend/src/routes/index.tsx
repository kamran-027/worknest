import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Jobs from "../pages/Jobs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "jobs", element: <Jobs /> },
    ],
  },
]);
