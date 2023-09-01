import { Navigate } from "react-router-dom";

const ProtectedRouteStudent = ({ children }) => {
  let data = JSON.parse(localStorage.getItem("user-info"));

  if (data?.token) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRouteStudent;
