import { Navigate } from "react-router-dom";

const ProtectedRouteStudent = ({ children }) => {
  let data = JSON.parse(sessionStorage.getItem("user-info"));

  if (data?.token && data?.role === "student") {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRouteStudent;
