import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import "./App.css";
import UserResetPassword from "./components/User/UserResetPassword";
import SignIn from "./components/User/SignIn";
import ForgotPassword from "./components/User/ForgotPassword";
import SignUp from "./components/User/SignUp";
import NotFound from "./reusable/NotFound";
import SideBar from "./reusable/Dashboard";
import ProtectedRouteTeacher from "./Routes/ProtectedRouteTeacher";
import ProtectedRouteStudent from "./Routes/ProtectedRouteStudent";
import Students from "./components/Teacher/Students";
import Teacher from "./components/Teacher/Teacher";
import CreateExam from "./components/Teacher/CreateExam";
import { teacherSideBarProps } from "./utils/Constants";
import { studentSideBarProps } from "./utils/Constants";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />

        {/* Teacher Routes */}
        <Route
          path="/teacher/*"
          element={
            <ProtectedRouteTeacher>
              <Outlet />
            </ProtectedRouteTeacher>
          }
        >
          <Route
            index
            element={
              <SideBar
                navigateTo="teacher"
                props={teacherSideBarProps}
                component={<Teacher />}
              />
            }
          />
          <Route
            path="Students"
            element={
              <SideBar
                navigateTo="teacher"
                props={teacherSideBarProps}
                component={<Students />}
              />
            }
          />
          <Route
            path="exam"
            element={
              <SideBar
                navigateTo="teacher"
                props={teacherSideBarProps}
                component={<CreateExam />}
              />
            }
          />
          <Route
            path="profile"
            element={
              <SideBar
                navigateTo="teacher"
                props={teacherSideBarProps}
                component={<UserResetPassword />}
              />
            }
          />
        </Route>

        {/* Student Routes */}
        <Route
          path="/student/*"
          element={
            <ProtectedRouteStudent>
              <Outlet />
            </ProtectedRouteStudent>
          }
        >
          <Route
            index
            element={
              <SideBar
                navigateTo="student"
                props={studentSideBarProps}
                component={<></>}
              />
            }
          />
          <Route
            path="profile"
            element={
              <SideBar
                navigateTo="student"
                props={studentSideBarProps}
                component={<></>}
              />
            }
          />
        </Route>

        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
