const initialState = {
  allExamContainer: [],
  teacherExamContainer: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TEACHER_EXAMS":
      return {
        ...state,
        teacherExamContainer: [...action.payload],
      };

    default:
      return state;
  }
};
export default reducer;
