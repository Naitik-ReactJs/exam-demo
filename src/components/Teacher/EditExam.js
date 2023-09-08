import React, { useEffect, useState } from "react";
import apiAction from "../../api/apiAction";
import Loader from "../../reusable/Loader";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../reusable/Button";
import { useLocation } from "react-router-dom";
const EditExam = () => {
  const [loading, setLoading] = useState(true);
  const location = new URLSearchParams(useLocation().search);
  const id = location.get("id");
  const initialQuestions = Array.from({ length: 15 }, () => ({
    question: "",
    answer: "",
    options: ["", "", "", ""],
  }));

  // managing the questions state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const token = JSON.parse(localStorage.getItem("user-info"))?.token;

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
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    fetchExamDetail();
  }, []);
  const [examData, setExamData] = useState({
    notes: "",
    subjectName: "",
  });
  const [questions, setQuestions] = useState(initialQuestions);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(15).fill(""));
  const { subjectName, notes } = examData;
  const formData = {
    subjectName: subjectName,
    questions: questions,
    notes: [notes],
  };

  const handleNextClick = () => {
    if (currentQuestionIndex < 14) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
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
  };

  const handleEditExam = async () => {
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
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4"> View Exam</h2>
      <h4 className="alert alert-danger text-center">
        You can also edit exam{" "}
      </h4>
      <div className="mb-4">
        <h3>Question {currentQuestionIndex + 1}</h3>
        <div className="form-group">
          <label className="mt-2 mb-2">Subject Name:</label>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter Subject Name here"
            value={subjectName}
            onChange={handleSubjectNameChange}
            disabled={currentQuestionIndex !== 0}
          />
        </div>
        <div className="form-group">
          <label className="mt-2 mb-2">Question:</label>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter your question here"
            value={questions[currentQuestionIndex]?.question || ""}
            onChange={(e) => {
              const updatedQuestions = [...questions];
              updatedQuestions[currentQuestionIndex].question = e.target.value;
              setQuestions(updatedQuestions);
            }}
          />
        </div>
        <form>
          <div className="form-group">
            <label className="mt-2 mb-2">Answers:</label>
            {questions[currentQuestionIndex]?.options.map((option, index) => (
              <div className="mb-3" key={index}>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name={`question${currentQuestionIndex}`}
                    value={option}
                    checked={questions[currentQuestionIndex]?.answer === option}
                    onChange={handleAnswerChange}
                  />
                  <input
                    type="text"
                    className="form-control ms-2"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => {
                      const updatedQuestions = [...questions];
                      updatedQuestions[currentQuestionIndex].options[index] =
                        e.target.value;
                      setQuestions(updatedQuestions);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="form-group">
            <label className="mt-2 mb-2">Selected answer:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Selected Answer"
              value={selectedAnswers && selectedAnswers[currentQuestionIndex]}
              readOnly
            />
            {selectedAnswers[currentQuestionIndex]}
          </div>
        </form>
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
      <div className="mt-4">
        <h4>Exam data:</h4>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default EditExam;
