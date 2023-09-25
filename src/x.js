// //
// // const initialState = {
// //   examData: {
// //     subjectName: "",
// //   },
// //   questions: Array.from({ length: 15 }, () => ({
// //     question: "",
// //     answer: "",
// //     options: ["1", "2", "3", "4"],
// //   })),
// //   selectedAnswers: Array(15).fill(""),
// //   formErrors: {
// //     subjectError: "",
// //     questionError: "",
// //     optionError: "",
// //     selectedAnsError: "",
// //     notesError: "",
// //   },
// //   notesText: "",
// //   addNotes: [],
// // };

// //
// // const createExamReducer = (state = initialState, action) => {
// //   switch (action.type) {
// //     case SET_SUBJECTNAME:
// //       return {
// //         ...state,
// //         examData: action.payload,
// //       };
// //     case SET_QUESTIONS:
// //       return {
// //         ...state,
// //         questions: action.payload,
// //       };
// //     case SET_SELECTED_ANSWERS:
// //       return {
// //         ...state,
// //         selectedAnswers: action.payload,
// //       };
// //     case SET_FORM_ERRORS:
// //       return {
// //         ...state,
// //         formErrors: action.payload,
// //       };
// //     case SET_NOTES_TEXT:
// //       return {
// //         ...state,
// //         notesText: action.payload,
// //       };
// //     case SET_ADD_NOTES:
// //       return {
// //         ...state,
// //         addNotes: action.payload,
// //       };
// //     default:
// //       return state;
// //   }
// // };

// // export default createExamReducer;

// // import { useSelector, useDispatch } from "react-redux";
// // import {
// //   setExamData,
// //   setQuestions,
// //   setSelectedAnswers,
// //   setFormErrors,
// //   setNotesText,
// //   setAddNotes,
// // } from "../../redux/teacher/actions/IndexIncrement"; // Import your Redux actions

// // // ...

// // const CreateExam = () => {
// //   const dispatch = useDispatch();
// //   const examData = useSelector((state) => state.examData);
// //   const questions = useSelector((state) => state.questions);
// //   const selectedAnswers = useSelector((state) => state.selectedAnswers);
// //   const formErrors = useSelector((state) => state.formErrors);
// //   const notesText = useSelector((state) => state.notesText);
// //   const addNotes = useSelector((state) => state.addNotes);

// //   // ...

// //   const handleNextClick = () => {
// //     const error = handleExamError(
// //       (errors) => dispatch(setFormErrors(errors)),
// //       questions,
// //       currentQuestionIndex,
// //       examData,
// //       selectedAnswers
// //     );

// //     if (error) {
// //       if (currentQuestionIndex < 14) {
// //         dispatch(questionIndexIncrement());
// //       }
// //     }
// //   };

// //   const handleNotesChange = (e) => {
// //     const { value } = e.target;
// //     dispatch(setNotesText(value));
// //     dispatch(
// //       setExamData({
// //         ...examData,
// //         notes: value,
// //       })
// //     );
// //     dispatch(setFormErrors({ ...formErrors, notesError: "" }));
// //   };

// //   const handleAddNotes = () => {
// //     if (addNotes && notesText.trim() === "") {
// //       dispatch(setFormErrors({ ...formErrors, notesError: "notes is required" }));
// //     } else if (filteredNotes.length !== 0) {
// //       dispatch(setFormErrors({ ...formErrors, notesError: "error notes same" }));
// //       return false;
// //     } else {
// //       dispatch(setAddNotes([...addNotes, notesText]));
// //       dispatch(setNotesText(""));
// //       dispatch(setFormErrors({ ...formErrors, notesError: "" }));
// //     }
// //   };

// //   // ...

// //   return (
// //     <div className="container mt-5">
// //       {/* ... */}
// //     </div>
// //   );
// // };

// // export default CreateExam;
// // //create exam redux end
// // // notes
// // import React from "react";
// // import Button from "../../reusable/Button";

// // const NotesSection = ({
// //   notesText,
// //   addNotes,
// //   handleNotesChange,
// //   handleAddNotes,
// //   handleDeleteNotes,
// //   currentQuestionIndex,
// //   notesError,
// // }) => {
// //   const filteredNotes = addNotes.filter((item) => item && item === notesText);

// //   return (
// //     <div>
// //       <label>Notes:</label>
// //       <input
// //         type="text"
// //         className="form-control"
// //         placeholder="Enter notes at last question"
// //         value={notesText}
// //         disabled={currentQuestionIndex !== 14}
// //         name="notes"
// //         onChange={handleNotesChange}
// //       />
// //       {notesError && (
// //         <div className="alert text-center alert-danger w-75 mt-4">
// //           {notesError}
// //         </div>
// //       )}
// //       <Button
// //         className="btn btn-primary mt-2"
// //         disabled={currentQuestionIndex !== 14}
// //         buttonText={"Add note"}
// //         onClick={handleAddNotes}
// //       />
// //       {addNotes &&
// //         addNotes.map((item, index) => {
// //           return (
// //             <div key={index} className="d-flex justify-content-between">
// //               <span>{item}</span>
// //               <Button
// //                 className="btn btn-sm mt-2"
// //                 disabled={index !== 14}
// //                 buttonText={" "}
// //                 onClick={() => handleDeleteNotes(index)}
// //               />
// //             </div>
// //           );
// //         })}
// //     </div>
// //   );
// // };

// // export default NotesSection;

// // // Create a Redux action type
const SET_SELECTED_ANSWERS = "SET_SELECTED_ANSWERS";
const SET_ANSWER_EDIT = "SET_ANSWER_EDIT";

// Define Redux actions
export const setSelectedAnswers = (answers) => ({
  type: SET_SELECTED_ANSWERS,
  payload: answers,
});

export const setAnswerEdit = (editStatus) => ({
  type: SET_ANSWER_EDIT,
  payload: editStatus,
});

// // // Define the initial state
// // const initialState = {
// //   selectedAnswers: {},
// //   isEdit: false,
// // };

// //
// // const giveExamReducer = (state = initialState, action) => {
// //   switch (action.type) {
// //     case SET_SELECTED_ANSWERS:
// //       return {
// //         ...state,
// //         selectedAnswers: action.payload,
// //       };
// //     case SET_ANSWER_EDIT:
// //       return {
// //         ...state,
// //         isEdit: action.payload,
// //       };
// //     default:
// //       return state;
// //   }
// // };

// // export default giveExamReducer;
// // import { useSelector, useDispatch } from "react-redux";
// // import { setSelectedAnswers, setAnswerEdit } from "./giveExamReducer"; // Import your Redux actions and reducer

// // // ...

// // const GiveExam = () => {
// //   const dispatch = useDispatch();
// //   const selectedAnswers = useSelector((state) => state.giveExam.selectedAnswers);
// //   const isEdit = useSelector((state) => state.giveExam.isEdit);

// //   // ...

// //   const handleNextClick = () => {
// //     const selectedAnswer = selectedAnswers[data[currentQuestionIndex]._id];
// //     if (selectedAnswer) {
// //       if (currentQuestionIndex < data.length - 1) {
// //         dispatch(questionIndexIncrement());
// //       }
// //     } else {
// //       toast.error("Please select an answer before proceeding.");
// //     }
// //   };

//   const handleAnswerChange = (e) => {
//     const questionId = data[currentQuestionIndex]._id;
//     const updatedSelectedAnswers = { ...selectedAnswers };
//     updatedSelectedAnswers[questionId] = e.target.value;
//     dispatch(setSelectedAnswers(updatedSelectedAnswers));
//   };

//   const handleReviewClick = () => {
//     const selectedAnswer = selectedAnswers[data[currentQuestionIndex]._id];
//     if (selectedAnswer) {
//       dispatch(setAnswerEdit(true));
//     } else {
//       toast.error("Please select an answer before proceeding.");
//     }
//   };

//   const handleEditAnswer = (id) => {
//     dispatch(setAnswerEdit({ [id]: true }));
//   };

// //   const handleSubmitExam = () => {
// //     const response = apiAction({
// //       method: "post",
// //       url: "student/giveExam",
// //       id,
// //       data: formData,
// //       setLoading,
// //     });
// //     if (response.statusCode === 200) {
// //       navigate("/student");
// //     }
// //   };

// //   // ...

// //   return (
// //     <>
// //       {isEdit ? (
// //         <div>
// //           {data &&
// //             data.map((item, questionIndex) => (
// //               <Fragment key={questionIndex}>
// //                 <Exam
// //                   // ...
// //                   answerEdit={answerEdit[questionIndex]}
// //                 />
// //                 <div className="text-center w-40 exam-responsive">
// //                   <Button
// //                     buttonText={"edit answer"}
// //                     className={"btn btn-danger mb-3"}
// //                     onClick={() => handleEditAnswer(questionIndex)}
// //                   />
// //                 </div>
// //               </Fragment>
// //             ))}
// //           <div className="text-center w-75 mt-3 pt-3 mb-5">
// //             <Button
// //               buttonText={"Submit"}
// //               className={"btn btn-success"}
// //               onClick={handleSubmitExam}
// //             />
// //           </div>
// //         </div>
// //       ) : (
// //         <>
// //           {currentQuestion && (
// //             <>
// //               <Exam
// //                 // ...
// //                 answerEdit={true}
// //               />
// //               <div className="text-center w-50 exam-responsive">
// //                 <Button
// //                   className="btn btn-danger me-2"
// //                   onClick={handlePreviousClick}
// //                   disabled={currentQuestionIndex === 0}
// //                   buttonText={"Previous"}
// //                 />
// //                 {/* ... */}
// //               </div>
// //             </>
// //           )}
// //           <pre>
// //             {JSON.stringify(data.map((item) => item.question).length, null, 2)}
// //           </pre>
// //           <ToastContainer autoClose={2000} theme="colored" />
// //         </>
// //       )}
// //     </>
// //   );
// // };

// // export default GiveExam;
// // Create a Redux action type
// const SET_SUBJECTNAME = "SET_SUBJECTNAME";
// const SET_QUESTIONS = "SET_QUESTIONS";
// const SET_SELECTED_ANSWERS = "SET_SELECTED_ANSWERS";
// const SET_FORM_ERRORS = "SET_FORM_ERRORS";
// const SET_NOTES_TEXT = "SET_NOTES_TEXT";
// const SET_ADD_NOTES = "SET_ADD_NOTES";

// export const setExamData = (data) => ({
//   type: SET_SUBJECTNAME,
//   payload: data,
// });

// export const setQuestions = ({ question, index }) => ({
//   type: SET_QUESTIONS,
//   payload: question[index],
// });

// export const setSelectedAnswers = ({ answers, index }) => ({
//   type: SET_SELECTED_ANSWERS,
//   payload: answers[index],
// });

// export const setFormErrors = (errors) => ({
//   type: SET_FORM_ERRORS,
//   payload: errors,
// });

// export const setNotesText = (text) => ({
//   type: SET_NOTES_TEXT,
//   payload: text,
// });

// export const setAddNotes = (notes) => ({
//   type: SET_ADD_NOTES,
//   payload: notes,
// });
// const initialState = {
//   teacherExamContainer: [],
//   examContainer: [],
//   studentList: [],
//   value: 0,
//   studentDetails: [],
//   CreateExam: {
//     subjectName: "",

//     questions: Array.from({ length: 15 }, () => ({
//       question: "",
//       answer: "",
//       options: ["", "", "", ""],
//     })),
//     selectedAnswers: Array(15).fill(""),
//     formErrors: {
//       subjectError: "",
//       questionError: "",
//       optionError: "",
//       selectedAnsError: "",
//       notesError: "",
//     },
//     notesText: "",
//     addNotes: [],
//   },
// };
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "FETCH_TEACHER_EXAMS":
//       return {
//         ...state,
//         teacherExamContainer: [...action.payload],
//       };
//     case "FETCH_EXAM_DATA":
//       return {
//         ...state,
//         examContainer: action.payload,
//       };
//     case "FETCH_STUDENTS_LIST":
//       return {
//         ...state,
//         studentList: action.payload,
//       };
//     case "INCREMENT_INDEX":
//       return {
//         ...state,
//         value: state.value + 1,
//       };
//     case "DECREMENT_INDEX":
//       return {
//         ...state,
//         value: state.value - 1,
//       };
//     case "FETCH_STUDENT_DETAILS":
//       return {
//         ...state,
//         studentDetails: action.payload,
//       };
//     case "SET_SUBJECTNAME":
//       return {
//         ...state,
//         examData: [...action.payload],
//       };
//     case "SET_QUESTIONS":
//       return {
//         ...state,
//         questions: [...action.payload],
//       };
//     case "SET_SELECTED_ANSWERS":
//       return {
//         ...state,
//         selectedAnswers: action.payload,
//       };
//     case "SET_FORM_ERRORS":
//       return {
//         ...state,
//         formErrors: action.payload,
//       };
//     case "SET_NOTES_TEXT":
//       return {
//         ...state,
//         notesText: action.payload,
//       };
//     case "SET_ADD_NOTES":
//       return {
//         ...state,
//         addNotes: action.payload,
//       };

//     default:
//       return state;
//   }
// };
// export default reducer;
