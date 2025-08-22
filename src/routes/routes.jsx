import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import App from "../App";
import AddStudent from "../pages/AddStudent";
import StudentList from "../pages/StudentList";
import ViewProfile from "../pages/ViewProfile";
import AdminList from "../pages/AdminList";
import AddAdmin from "../pages/AddAdmin";
import Login from "../pages/Login";
import NotFound from "../components/NotFound/NotFound";
import PendingStudent from "../pages/PendingStudent";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import Profile from "../pages/Profile";
import StudentRetake from "../pages/StudentRetake";
import StudentPerformance from "../pages/StudentPerformance";
import ForgotPassword from "../pages/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element:<ProtectedRoute>
              <App />
            </ProtectedRoute>,
    children: [
      {
        path: "",
        element: <Dashboard />
      },
      {
        path: "addStudent",
        element: <AddStudent />,
      },
      {
        path: "pendingStudent",
        element: <PendingStudent />,
      },
      {
        path: "studentRetake",
        element: <StudentRetake />,
      },
      {
        path: "studentList",
        element: <StudentList />,
      },
      {
        path: "viewProfile/:_id",
        element: <ViewProfile />,
      },
      {
        path: "addAdmin",
        element: <AddAdmin />,
      },
      {
        path: "adminList",
        element: <AdminList />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "forgotPassword",
        element: <ForgotPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
