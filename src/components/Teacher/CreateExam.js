  import { useState } from "react";
  import apiAction from "../../api/apiAction";
  import Loader from "../../reusable/Loader";
  import { ToastContainer } from "react-toastify";
  import Button from "../../reusable/Button";
  import { CreateExamInputForm } from "../../utils/Input";
  import { handleExamError } from "../../utils/Validation";
  import ExamForm from "../../reusable/ExamForm";
  import { useNavigate } from "react-router-dom";
  import Notes from "./Notes";
  import {
    setSubjectName,
    setQuestions,
    setCurrentQuestionIndex,
    setSelectedAnswers,
    setNotesText,
    setAddNotes,
    setFormErrors,

  } from "../../redux/teacher/actions/CreateExam";
  import { useDispatch, useSelector } from "react-redux";

  const CreateExam = () => {
    const QUESTION_COUNT = 15;
    const examData = useSelector((state) => state.teacher.exam);
    const dispatch = useDispatch();


    const { subjectName, questions, currentQuestionIndex, selectedAnswers, notesText, addNotes  } = examData;

    const navigate = useNavigate();

  const [loading , setLoading] = useState(false)

    const formData = {
      subjectName: subjectName,
      questions: questions,
      notes: [...addNotes],
    };

    const formErrors = useSelector((state) => state.teacher.errors);
    const {
      subjectError,
      questionError,
      optionError,
      selectedAnsError,
      notesError
    } = formErrors;

    const updateFormErrors = (newErrors) => {
      dispatch(setFormErrors(newErrors)); // Dispatch the action to update formErrors in Redux
    };
    const handleNextClick = () => {
      const formErrors = handleExamError({
        questions,
        currentQuestionIndex,
        examData,
        selectedAnswers,
        addNotes,
        notesText,
      });
      updateFormErrors(formErrors);

      if (Object.keys(formErrors).length === 0 && currentQuestionIndex < QUESTION_COUNT - 1) {
        dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
      } 
    };

    const handlePreviousClick = () => {
      if (currentQuestionIndex > 0) {
        dispatch(setCurrentQuestionIndex(currentQuestionIndex - 1));

      }
      updateFormErrors({
        questionError: "",
      });
    };

    const handleInputChange = (e, field, index) => {
      const updatedQuestions = [...questions]; // Create a copy of the questions array
      updatedQuestions[currentQuestionIndex][field] = e.target.value; // Update the specific question at the current index

      if (field === "answer") {

        const updatedSelectedAnswers = [...selectedAnswers];
        updatedSelectedAnswers[currentQuestionIndex] = e.target.value;
        dispatch(setSelectedAnswers(updatedSelectedAnswers));
        updateFormErrors({
          selectedAnsError: "",
        });
      } else if (field === "question") {
        updateFormErrors({
          questionError: "",
        });
      } else if (field === "subjectName") {
        dispatch(setSubjectName(e.target.value));
        updateFormErrors({
          subjectError: "",
        });
      } 

      dispatch(setQuestions(updatedQuestions)); 
    };
    

    const handleNotesChange = (e) => {
      const value = e.target.value;
      dispatch( setNotesText(value));

      updateFormErrors({
        notesError: "",
      });
    };

    const handleAddNotes = () => {
      const formErrors = handleExamError({
        questions,
        currentQuestionIndex,
        examData,
        selectedAnswers,
        addNotes,
        notesText,
      });
    
      updateFormErrors(formErrors);

      if (!formErrors.notesError) {
        const updatedNotes = [...addNotes, notesText];
        dispatch(setAddNotes(updatedNotes));
      dispatch( setNotesText(""));
      }
    };
    
    const handleDeleteNotes = (index) => {
      const newNotes = [...addNotes];
      newNotes.splice(index, 1);
      dispatch(setAddNotes(newNotes));
    };

    const handleSubmit = async () => {
      const formErrors = handleExamError({
        questions,
        currentQuestionIndex,
        examData,
        selectedAnswers,
        addNotes,
        notesText,
      });

      if (!formErrors) {
        dispatch(setLoading(true))

        const response = await apiAction({
          method: "post",
          url: "dashboard/Teachers/Exam",
          data: formData,
          setLoading,
        });

        if (response.statusCode === 200) {
          navigate("/teacher");
        }
      }
    };

    if (loading) {
      return <Loader />;
    }

    const input = CreateExamInputForm(
  examData    ,
      (e) => handleInputChange(e, "subjectName"),
      currentQuestionIndex,
      questions,
      (e) => handleInputChange(e, "question"),
      (e) => handleInputChange(e, "answer"),
      selectedAnswers,
      subjectError,
      questionError,
      optionError,
      selectedAnsError
    );

    return (
      <div className="container mt-5">
        <h2 className="mb-4">Create Exam</h2>
        <div className="mb-4">
          <h3>Question {currentQuestionIndex + 1}</h3>
          <ExamForm
            inputField={input}
            currentQuestionIndex={currentQuestionIndex}
            questions={questions}
            setQuestions={setQuestions}
            setFormErrors={setFormErrors}
          />
          <Notes
            addNotes={addNotes}
            handleAddNotes={handleAddNotes}
            handleDeleteNotes={handleDeleteNotes}
            notesText={notesText}
            notesError={notesError}
            currentQuestionIndex={currentQuestionIndex}
            handleNotesChange={handleNotesChange}
            />
        </div>

        <div className="mb-3">
          <Button
            className="btn btn-primary me-2"
            onClick={handlePreviousClick}
            disabled={currentQuestionIndex === 0}
            buttonText={"Previous"}
          />
          {currentQuestionIndex === QUESTION_COUNT - 1 ? (
            <>
              <Button
                className="btn btn-success"
                onClick={handleSubmit}
                buttonText={"Submit"}
              />
            </>
          ) : (
            <Button
              className="btn btn-primary"
              onClick={() => handleNextClick()}
              buttonText={"Next"}
            />
          )}
        </div>
        <pre>{JSON.stringify(formData, null ,2)}</pre>
        <ToastContainer autoClose={2000} theme="colored" />
      </div>
    );
  };

  export default CreateExam;