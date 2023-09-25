import { Navigate } from "react-router-dom";

const ProtectedRouteTeacher = ({ children }) => {
  let data = JSON.parse(sessionStorage.getItem("user-info"));

  if (data?.token && data?.role === "teacher") {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRouteTeacher;
