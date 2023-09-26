import { Fragment, useEffect, useState } from "react";
import apiAction from "../../api/apiAction";
import Loader from "../../reusable/Loader";
import { ToastContainer } from "react-toastify";
import Button from "../../reusable/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { CreateExamInputForm } from "../../utils/Input";
import { handleExamError } from "../../utils/Validation";
import ExamForm from "../../reusable/ExamForm";
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
import Notes from "./Notes";
import { QUESTION_COUNT } from "../../utils/Constants";
import { SEO } from "../../Helmet";

const EditExam = () => {
  const examData = useSelector((state) => state.teacher.exam);
  const dispatch = useDispatch();

  const {
    subjectName,
    questions,
    currentQuestionIndex,
    selectedAnswers,
    notesText,
    addNotes,
  } = examData;
  const [loading, setLoading] = useState(false);

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
    notesError,
  } = formErrors;
  const updateFormErrors = (newErrors) => {
    dispatch(setFormErrors(newErrors));
  };
  const navigate = useNavigate();
  const token = JSON.parse(sessionStorage.getItem("user-info"))?.token;

  const location = new URLSearchParams(useLocation().search);
  const id = location.get("id");

  const fetchExamData = async () => {
    const response = await apiAction({
      method: "get",
      url: "dashboard/Teachers/viewExam",
      token: token,
      setLoading,
    });

    examData.notes = response.data
      .filter((item) => item._id === id)[0]
      ?.notes.join();
    dispatch(setAddNotes([examData.notes]));
    dispatch(
      setSubjectName(
        response.data.filter((item) => item._id === id)[0]?.subjectName
      )
    );
  };

  const fetchExamDetail = async () => {
    const response = await apiAction({
      method: "get",
      url: "dashboard/Teachers/examDetail",
      data: formData,
      setLoading,
      token,
      id,
    });

    dispatch(setQuestions(response.data.questions));
    dispatch(
      setSelectedAnswers(response.data.questions.map((item) => item.answer))
    );
  };

  useEffect(() => {
    fetchExamData();
    fetchExamDetail();
  }, []);

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

    if (
      Object.keys(formErrors).length === 0 &&
      currentQuestionIndex < QUESTION_COUNT - 1
    ) {
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
  const handleAnswerChange = (e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].answer = e.target.value;
    setQuestions(updatedQuestions);

    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[currentQuestionIndex] = e.target.value;
    dispatch(setSelectedAnswers(updatedSelectedAnswers));
  };

  const handleQuestionChange = (e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].question = e.target.value;
    dispatch(setQuestions(updatedQuestions));
  };

  const handleSubjectNameChange = (e) => {
    dispatch(setSubjectName(e.target.value));
  };

  const handleNotesChange = (e) => {
    const value = e.target.value;
    dispatch(setNotesText(value));

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
      dispatch(setNotesText(""));
    }
  };
  const handleDeleteNotes = (index) => {
    const newNotes = [...addNotes];
    newNotes.splice(index, 1);
    dispatch(setAddNotes(newNotes));
  };

  const handleEditExam = async () => {
    const formErrors = handleExamError({
      questions,
      currentQuestionIndex,
      examData,
      selectedAnswers,
      addNotes,
      notesText,
    });

    updateFormErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      const response = await apiAction({
        method: "put",
        url: "dashboard/Teachers/editExam",
        data: formData,
        setLoading,
        token,
        id,
      });

      if (response && response.statusCode === 200) {
        navigate("/teacher");
      }
    }
  };
  if (loading) {
    return <Loader />;
  }

  const input = CreateExamInputForm({
    examData,
    currentQuestionIndex,
    questions,
    handleAnswerChange,
    handleSubjectNameChange,
    handleQuestionChange,
    selectedAnswers,
    subjectError,
    questionError,
    optionError,
    selectedAnsError,
  });

  const examActionButtons = [
    {
      buttonText: "Previous",
      className: "btn btn-primary me-2",
      onClick: handlePreviousClick,
      disabled: currentQuestionIndex === 0,
    },
    {
      buttonText: "Next",
      className: "btn btn-primary ",
      onClick: handleNextClick,
    },
    {
      buttonText: "Save",
      className: "btn btn-success d-block mt-3",
      onClick: handleEditExam,
      disabled: currentQuestionIndex !== 14,
    },
  ];

  return (
    <div className="container mt-5">
      <SEO title="Edit Exam" />
      <h2 className="mb-4"> Edit Exam</h2>
      <div className="mb-4">
        <h3>Question {currentQuestionIndex + 1}</h3>
        <ExamForm
          inputField={input}
          currentQuestionIndex={currentQuestionIndex}
          questions={questions}
          setQuestions={setQuestions}
          setFormErrors={setFormErrors}
        />
      </div>{" "}
      <Notes
        addNotes={addNotes}
        handleAddNotes={handleAddNotes}
        handleDeleteNotes={handleDeleteNotes}
        notesText={notesText}
        notesError={notesError}
        currentQuestionIndex={currentQuestionIndex}
        handleNotesChange={handleNotesChange}
      />
      <div className="m-3">
        {examActionButtons.map((button, index) => {
          const { buttonText, className, onClick } = button;
          return (
            <Fragment key={index}>
              {" "}
              <Button
                buttonText={buttonText}
                className={className}
                onClick={onClick}
              />
            </Fragment>
          );
        })}
      </div>
      <ToastContainer autoClose={2000} theme="colored" />
    </div>
  );
};

export default EditExam;
