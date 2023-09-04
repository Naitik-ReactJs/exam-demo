import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import "./App.css";
import UserResetPassword from "./components/user/UserResetPassword";
import SignIn from "./components/user/SignIn";
import ForgotPassword from "./components/user/ForgotPassword";
import SignUp from "./components/user/SignUp";
import NotFound from "./reusable/NotFound";
import SideBar from "./reusable/Dashboard";
import ProtectedRouteTeacher from "./Routes/ProtectedRouteTeacher";
import ProtectedRouteStudent from "./Routes/ProtectedRouteStudent";
import ViewStudents from "./components/teacher/ViewStudents";
import CreateExam from "./components/teacher/CreateExam";
import { teacherSideBarProps } from "./utils/Constants";
import { studentSideBarProps } from "./utils/Constants";
import Teacher from "./components/teacher/Teacher";
import ViewStudentDetail from "./components/teacher/ViewStudentDetail";

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
            path="viewstudents"
            element={
              <SideBar
                navigateTo="teacher"
                props={teacherSideBarProps}
                component={<ViewStudents />}
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
            path="viewstudents/result"
            element={
              <SideBar
                navigateTo="teacher"
                props={teacherSideBarProps}
                component={<ViewStudentDetail />}
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
