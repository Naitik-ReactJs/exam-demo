import React from "react";
import { Navigate } from "react-router-dom";
import SideBar from "../reusable/SideBar";

const isLoggin = async () => {
  let data = await JSON.parse(localStorage.getItem("user-info"));
  if (data !== null) {
    return true;
  } else {
    return false;
  }
};
const ProtectedRoute = async () => {
  return isLoggin() ? <SideBar /> : <Navigate to="/" />;
};

export default ProtectedRoute;
