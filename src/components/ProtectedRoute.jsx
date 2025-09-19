import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.axToken);

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/" />;
  }

  // If token exists, render the protected component
  return children;
};

export default ProtectedRoute;
