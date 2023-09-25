import { SET_FORM_ERRORS } from "../actions/CreateExam";
import {
  FETCH_EXAM_DATA,
  FETCH_STUDENTS_LIST,
  FETCH_STUDENT_DETAILS,
  FETCH_TEACHER_EXAMS,
  SET_ADD_NOTES,
  SET_CURRENT_QUESTION_INDEX,
  SET_NOTES_TEXT,
  SET_QUESTIONS,
  SET_SELECTED_ANSWERS,
  SET_SUBJECT_NAME,
} from "../constants";

const initialState = {
  teacherExamContainer: [],
  examContainer: [],
  studentList: [],
  value: 0,
  studentDetails: [],
  exam: {
    subjectName: "",
    questions: Array.from({ length: 15 }, () => ({
      question: "",
      answer: "",
      options: ["", "", "", ""],
    })),
    currentQuestionIndex: 0,
    selectedAnswers: Array(15).fill(""),
    notesText: "",
    addNotes: [],
  },

  errors: {
    subjectError: "",
    questionError: "",
    optionError: "",
    selectedAnsError: "",
    notesError: "",
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TEACHER_EXAMS:
      return {
        ...state,
        teacherExamContainer: [...action.payload],
      };
    case FETCH_EXAM_DATA:
      return {
        ...state,
        examContainer: action.payload,
      };
    case FETCH_STUDENTS_LIST:
      return {
        ...state,
        studentList: action.payload,
      };

    case FETCH_STUDENT_DETAILS:
      return {
        ...state,
        studentDetails: action.payload,
      };
    case SET_SUBJECT_NAME:
      return {
        ...state,
        exam: {
          ...state.exam,
          subjectName: action.payload,
        },
      };
    case SET_QUESTIONS:
      return {
        ...state,
        exam: {
          ...state.exam,
          questions: action.payload,
        },
      };
    case SET_CURRENT_QUESTION_INDEX:
      return {
        ...state,
        exam: {
          ...state.exam,
          currentQuestionIndex: action.payload,
        },
      };
    case SET_SELECTED_ANSWERS:
      return {
        ...state,
        exam: {
          ...state.exam,
          selectedAnswers: action.payload,
        },
      };
    case SET_NOTES_TEXT:
      return {
        ...state,
        exam: {
          ...state.exam,
          notesText: action.payload,
        },
      };
    case SET_ADD_NOTES:
      return {
        ...state,
        exam: {
          ...state.exam,
          addNotes: action.payload,
        },
      };
    case SET_FORM_ERRORS:
      return { ...state, errors: { ...state, ...action.payload } };
    default:
      return state;
  }
};

export default reducer;
