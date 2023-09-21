const initialState = {
  allExamContainer: [],
  examPaperContainer: [],
  profileContainer: {},
  questionIndex: 0,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ALL_EXAMS":
      return {
        ...state,
        allExamContainer: [...action.payload],
      };
    case "FETCH_EXAM_PAPER":
      return {
        ...state,
        examPaperContainer: [...action.payload],
      };
    case "FETCH_PROFILE":
      return {
        ...state,
        profileContainer: action.payload,
      };

    default:
      return state;
  }
};
export default reducer;
