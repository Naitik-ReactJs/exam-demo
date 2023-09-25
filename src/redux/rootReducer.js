import StudentReducer from "./student/reducer/reducer";
import TeacherReducer from "./teacher/reducer/reducer";
import { combineReducers } from "redux";
export default combineReducers({
  student: StudentReducer,
  teacher: TeacherReducer,
});
