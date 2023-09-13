import React, { useEffect, useState } from "react";
import apiAction from "../../api/apiAction";
import Loader from "../../reusable/Loader";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../reusable/Button";
import { useLocation } from "react-router-dom";
import { CreateExamInputForm, handleExamError } from "../../utils/Input";
import ExamForm from "../../reusable/ExamForm";
import { token } from "../../utils/Constants";
const EditExam = () => {
  const [loading, setLoading] = useState(true);
  const location = new URLSearchParams(useLocation().search);
  const id = location.get("id");
  const initialQuestions = Array.from({ length: 15 }, () => ({
    question: "",
    answer: "",
    options: ["", "", "", ""],
  }));
  const [examData, setExamData] = useState({
    notes: "",
    subjectName: "",
  });
  const { subjectName, notes } = examData;
  const [formErrors, setFormErrors] = useState({
    subjectError: "",
    questionError: "",
    optionError: "",
    selectedAnsError: "",
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const fetchExamData = async () => {
    try {
      const response = await apiAction({
        method: "get",
        url: "dashboard/Teachers/viewExam",
        token: token,
        setLoading,
      });

      examData.subjectName = response.data.filter(
        (item) => item._id === id
      )[0]?.subjectName;
      examData.notes = response.data
        .filter((item) => item._id === id)[0]
        ?.notes.join();
    } catch (error) {
      toast.error("Error fetching data:");
    }
  };
  const fetchExamDetail = async () => {
    try {
      const response = await apiAction({
        method: "get",
        url: "dashboard/Teachers/examDetail",
        data: formData,
        setLoading,
        token,
        id,
      });
      setQuestions(response.data.questions);
      setSelectedAnswers(response.data.questions.map((item) => item.answer));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchExamData();
    fetchExamDetail();
  }, []);

  const [questions, setQuestions] = useState(initialQuestions);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(15).fill(""));

  const formData = {
    subjectName: subjectName,
    questions: questions,
    notes: [notes],
  };

  const handleNextClick = () => {
    const error = handleExamError(
      setFormErrors,
      questions,
      currentQuestionIndex,
      examData,
      selectedAnswers
    );
    if (error) {
      if (currentQuestionIndex < 14) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }
    }
  };

  const handlePreviousClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleAnswerChange = (e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].answer = e.target.value;
    setQuestions(updatedQuestions);

    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[currentQuestionIndex] = e.target.value;
    setSelectedAnswers(updatedSelectedAnswers);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      selectedAnsError: "",
    }));
  };

  const handleNotesChange = (e) => {
    setExamData({
      ...examData,
      notes: e.target.value,
    });
  };

  const handleSubjectNameChange = (e) => {
    setExamData({
      ...examData,
      subjectName: e.target.value,
    });
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      subjectError: "",
    }));
  };

  const handleEditExam = async () => {
    const error = handleExamError(
      setFormErrors,
      questions,
      currentQuestionIndex,
      examData,
      selectedAnswers
    );
    if (error) {
      try {
        const response = await apiAction({
          method: "put",
          url: "dashboard/Teachers/editExam",
          data: formData,
          setLoading,
          token,
          id,
        });
        toast.success(response.message);
      } catch (error) {
        toast.error(error);
      }
    }
  };

  if (loading) {
    return <Loader />;
  }
  const handleQuestionChange = (e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].question = e.target.value;
    setQuestions(updatedQuestions);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      questionError: "",
    }));
  };
  const input = CreateExamInputForm(
    examData,
    handleSubjectNameChange,
    currentQuestionIndex,
    questions,
    handleQuestionChange,
    handleAnswerChange,
    selectedAnswers,
    formErrors.subjectError,
    formErrors.questionError,
    formErrors.optionError,
    formErrors.selectedAnsError
  );
  return (
    <div className="container mt-5">
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
      </div>
      <div className="mb-3">
        <Button
          className="btn btn-primary me-2"
          onClick={handlePreviousClick}
          disabled={currentQuestionIndex === 0}
          buttonText={"    Previous"}
        ></Button>
        {currentQuestionIndex === 14 ? (
          <>
            <label className="mb-2 d-block mt-4">Notes:</label>
            <textarea
              className="form-control mb-3"
              placeholder="Notes for this Exam..."
              onChange={handleNotesChange}
              value={notes}
            />
            <Button
              className="btn btn-success"
              onClick={handleEditExam}
              buttonText={"Save"}
            ></Button>
          </>
        ) : (
          <Button
            className="btn btn-primary"
            onClick={handleNextClick}
            buttonText={"Next"}
          ></Button>
        )}
      </div>

      <ToastContainer autoClose={2000} theme="colored" />
    </div>
  );
};

export default EditExam;
