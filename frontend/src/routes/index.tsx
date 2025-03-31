import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Jobs from "../pages/Jobs";
import Applications from "../pages/Applications";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "jobs", element: <Jobs /> },
      { path: "applications", element: <Applications /> },
    ],
  },
]);
