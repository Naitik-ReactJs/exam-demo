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
import Dashboard from "./reusable/Dashboard";
import ProtectedRouteTeacher from "./routes/ProtectedRouteTeacher";
import ProtectedRouteStudent from "./routes/ProtectedRouteStudent";
import ViewStudents from "./components/teacher/ViewStudents";
import CreateExam from "./components/teacher/CreateExam";
import ViewExam from "./components/teacher/ViewExam";
import EditExam from "./components/teacher/EditExam";
import { teacherSideBarProps } from "./utils/Constants";
import { studentSideBarProps } from "./utils/Constants";
import Teacher from "./components/teacher/Teacher";
import ViewStudentDetail from "./components/teacher/ViewStudentDetail";
import UserResetPassword from "./components/user/UserResetPassword";
import Student from "./components/student/Student";
import Profile from "./components/student/Profile";
import Form from "./components/Form";
function App() {
  return (
    <Router>
      {/* <Form /> */}
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
              <Dashboard
                navigateTo="teacher"
                props={teacherSideBarProps}
                component={<Teacher />}
              />
            }
          />
          <Route
            path="view-students"
            element={
              <Dashboard
                navigateTo="teacher"
                props={teacherSideBarProps}
                component={<ViewStudents />}
              />
            }
          />
          <Route
            path="create-exam"
            element={
              <Dashboard
                navigateTo="teacher"
                props={teacherSideBarProps}
                component={<CreateExam />}
              />
            }
          />
          <Route
            path="view-exam"
            element={
              <Dashboard
                navigateTo="teacher"
                props={teacherSideBarProps}
                component={<ViewExam />}
              />
            }
          />
          <Route
            path="edit-exam"
            element={
              <Dashboard
                navigateTo="teacher"
                props={teacherSideBarProps}
                component={<EditExam />}
              />
            }
          />
          <Route
            path="view-students/result"
            element={
              <Dashboard
                navigateTo="teacher"
                props={teacherSideBarProps}
                component={<ViewStudentDetail />}
              />
            }
          />
          <Route
            path="profile"
            element={
              <Dashboard
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
              <Dashboard
                navigateTo="student"
                props={studentSideBarProps}
                component={<Student />}
              />
            }
          />
          <Route
            path="profile"
            element={
              <Dashboard
                navigateTo="student"
                props={studentSideBarProps}
                component={<Profile />}
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
