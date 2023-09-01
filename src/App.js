import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import SignIn from "./components/SignIn";
import ForgotPassword from "./components/ForgotPassword";
import SignUp from "./components/SignUp";
import NotFound from "./reusable/NotFound";
import SideBar from "./reusable/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <Router>
      <>
        <Routes>
          {" "}
          <Route path="/" element={<SignIn />} />
          <Route
            path="/teacher"
            element={
              <ProtectedRoute>
                <SideBar
                  title="dashboard"
                  title1="students list"
                  title2="profile"
                />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
