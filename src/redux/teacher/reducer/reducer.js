const initialState = {
  teacherExamContainer: [],
  examContainer: [],
  studentList: [],
  value: 0,
  studentDetails: [],
  initialQuestions: Array.from({ length: 15 }, () => ({
    question: "",
    answer: "",
    options: ["", "", "", ""],
  })),
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
    case "INCREMENT_INDEX":
      return {
        ...state,
        value: state.value + 1,
      };
    case "DECREMENT_INDEX":
      return {
        ...state,
        value: state.value - 1,
      };
    case "FETCH_STUDENT_DETAILS":
      return {
        ...state,
        studentDetails: action.payload,
      };
    case "CREATE_EXAM":
      return {
        ...state,
        initialQuestions: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;
