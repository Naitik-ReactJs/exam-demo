const initialState = {
  allExamContainer: [],
  examPaperContainer: [],
  profileContainer: {},
  questionIndex: 0,
  selectedAnswers: {},
  isEdit: false,
  answerEdit: false,
  nameEdit: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ALL_EXAMS":
      return {
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
    case "INCREMENT_INDEX":
      return {
        ...state,
        questionIndex: state.questionIndex + 1,
      };
    case "DECREMENT_INDEX":
      return {
        ...state,
        questionIndex: state.questionIndex - 1,
      };
    case "SET_SELECTED_ANSWERS":
      return {
        ...state,
        selectedAnswers: action.payload,
      };
    case "SET_REVIEW_STATUS":
      return {
        ...state,
        isEdit: action.payload,
      };
    case "SET_ANSWER_EDIT":
      return {
        ...state,
        answerEdit: action.payload,
      };
    case "SET_NAME_MODIFIED":
      return {
        ...state,
        nameEdit: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;
// Define the initial state
