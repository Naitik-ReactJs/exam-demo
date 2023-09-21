const initialState = {
  teacherExamContainer: [],
  examContainer: [],
  studentList: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TEACHER_EXAMS":
      return {
        ...state,
        teacherExamContainer: [...action.payload],
      };
    case "FETCH_EXAM_DATA":
      return {
        ...state,
        examContainer: action.payload,
      };
    case "FETCH_STUDENTS_LIST":
      return {
        ...state,
        studentList: action.payload,
      };

    default:
      return state;
  }
};
export default reducer;
