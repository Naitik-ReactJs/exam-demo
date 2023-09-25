const SET_SELECTED_ANSWERS = "SET_SELECTED_ANSWERS";
const SET_REVIEW_STATUS = "SET_REVIEW_STATUS";
const SET_ANSWER_EDIT = "SET_ANSWER_EDIT";

export const setSelectedAnswers = (answers) => ({
  type: SET_SELECTED_ANSWERS,
  payload: answers,
});

export const setExamEdit = (editStatus) => ({
  type: SET_REVIEW_STATUS,
  payload: editStatus,
});
export const setAnswerEdit = (answerEdit) => ({
  type: SET_ANSWER_EDIT,
  payload: answerEdit,
});
