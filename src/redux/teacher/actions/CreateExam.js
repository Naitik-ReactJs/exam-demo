import {
  SET_ADD_NOTES,
  SET_CURRENT_QUESTION_INDEX,
  SET_NOTES_TEXT,
  SET_QUESTIONS,
  SET_SELECTED_ANSWERS,
  SET_SUBJECT_NAME,
} from "../constants";

export const setSubjectName = (subjectName) => ({
  type: SET_SUBJECT_NAME,
  payload: subjectName,
});

export const setQuestions = (questions) => ({
  type: SET_QUESTIONS,
  payload: questions,
});

export const setCurrentQuestionIndex = (index) => ({
  type: SET_CURRENT_QUESTION_INDEX,
  payload: index,
});

export const setSelectedAnswers = (answers) => ({
  type: SET_SELECTED_ANSWERS,
  payload: answers,
});

export const setNotesText = (text) => ({
  type: SET_NOTES_TEXT,
  payload: text,
});

export const setAddNotes = (notes) => ({
  type: SET_ADD_NOTES,
  payload: notes,
});

export const SET_FORM_ERRORS = "SET_FORM_ERRORS";

export const setFormErrors = (errors) => ({
  type: SET_FORM_ERRORS,
  payload: errors,
});
