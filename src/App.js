import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import "./App.css";
import UserNewPassword from "./components/user/UserNewPassword";
import SignIn from "./components/user/SignIn";
import ForgotPassword from "./components/user/ForgotPassword";
import SignUp from "./components/user/SignUp";
import NotFound from "./reusable/NotFound";

import ProtectedRouteTeacher from "./routes/ProtectedRouteTeacher";
import ProtectedRouteStudent from "./routes/ProtectedRouteStudent";
import ViewStudents from "./components/teacher/ViewStudents";
import CreateExam from "./components/teacher/CreateExam";
import ViewExam from "./components/teacher/ViewExam";
import EditExam from "./components/teacher/EditExam";

import Teacher from "./components/teacher/Teacher";
import ViewStudentDetail from "./components/teacher/ViewStudentDetail";
import UserResetPassword from "./components/user/UserResetPassword";
import Student from "./components/student/Student";
import Profile from "./components/student/Profile";
import GiveExam from "./components/student/GiveExam";
import Navbar from "./reusable/NavBar";
import { studentSideBarProps, teacherSideBarProps } from "./utils/Constants";

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
              <Navbar
                navigateTo="teacher"
                navbarTitle={teacherSideBarProps}
                component={<Teacher />}
              />
            }
          />
          <Route
            path="view-students"
            element={
              <Navbar
                navigateTo="teacher"
                navbarTitle={teacherSideBarProps}
                component={<ViewStudents />}
              />
            }
          />
          <Route
            path="create-exam"
            element={
              <Navbar
                navigateTo="teacher"
                navbarTitle={teacherSideBarProps}
                component={<CreateExam />}
              />
            }
          />
          <Route
            path="view-exam"
            element={
              <Navbar
                navigateTo="teacher"
                navbarTitle={teacherSideBarProps}
                component={<ViewExam />}
              />
            }
          />
          <Route
            path="edit-exam"
            element={
              <Navbar
                navigateTo="teacher"
                navbarTitle={teacherSideBarProps}
                component={<EditExam />}
              />
            }
          />
          <Route
            path="view-students/result"
            element={
              <Navbar
                navigateTo="teacher"
                navbarTitle={teacherSideBarProps}
                component={<ViewStudentDetail />}
              />
            }
          />
          <Route
            path="profile"
            element={
              <Navbar
                navigateTo="teacher"
                navbarTitle={teacherSideBarProps}
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
              <Navbar
                navigateTo="student"
                navbarTitle={studentSideBarProps}
                component={<Student />}
              />
            }
          />
          <Route
            path="profile"
            element={
              <Navbar
                navigateTo="student"
                navbarTitle={studentSideBarProps}
                component={<Profile />}
              />
            }
          />
          <Route
            path="exam"
            element={
              <Navbar
                navigateTo="student"
                navbarTitle={studentSideBarProps}
                component={<GiveExam />}
              />
            }
          />
        </Route>

        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/newPassword" element={<UserNewPassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
