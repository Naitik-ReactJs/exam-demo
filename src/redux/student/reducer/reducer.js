const initialState = {
  allExamContainer: [],
  teacherExamContainer: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ALL_EXAMS":
      return {
        ...state,
        allExamContainer: [...action.payload],
      };

    default:
      return state;
  }
};
export default reducer;
