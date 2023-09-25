import { SET_CURRENT_QUESTION_INDEX } from "../constants";

export const setCurrentQuestionIndex = (index) => ({
  type: SET_CURRENT_QUESTION_INDEX,
  payload: index,
});
