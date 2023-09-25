import {
  SET_SELECTED_ANSWERS,
  SET_REVIEW_STATUS,
  SET_ANSWER_EDIT,
} from "../constants";
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
