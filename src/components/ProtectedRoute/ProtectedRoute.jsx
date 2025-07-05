import { Navigate } from "react-router-dom";
import authStore from "../../store/authStore";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = authStore();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;