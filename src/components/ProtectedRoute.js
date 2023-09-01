import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  let data = JSON.parse(localStorage.getItem("user-info"));
  if (data?.token) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
