import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../reusable/Button";
import Loader from "../../reusable/Loader";
import apiAction from "../../api/apiAction";
import { useLocation } from "react-router-dom";
import { token } from "../../utils/Constants";

const ExamForStudent = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = new URLSearchParams(useLocation().search);
  const id = location.get("id");

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [data, setData] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState(
    new Array(data.length).fill("")
  );
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const fetchExam = async () => {
    try {
      const response = await apiAction({
        method: "get",
        url: "student/examPaper",
        token: token,
        id,
        setLoading,
      });
      setData(response.data);
    } catch (error) {
      toast.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchExam();
  }, []);

  const handleNextClick = () => {
    const selectedAnswer = selectedAnswers[data[currentQuestionIndex]._id];
    if (selectedAnswer) {
      if (currentQuestionIndex < data.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }
    } else {
      toast.error("Please select an answer before proceeding.");
    }
  };

  const handlePreviousClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleAnswerChange = (e) => {
    const questionId = data[currentQuestionIndex]._id;
    const updatedSelectedAnswers = { ...selectedAnswers };
    updatedSelectedAnswers[questionId] = e.target.value;
    setSelectedAnswers(updatedSelectedAnswers);
    setIsAnswerSelected(true);
  };

  const handleSubmit = () => {
    const selectedAnswer = selectedAnswers[data[currentQuestionIndex]._id];
    if (selectedAnswer) {
      setIsEdit(true);
    } else {
      toast.error("Please select an answer before proceeding.");
    }
  };

  const currentQuestion = data[currentQuestionIndex];
  // const formData = Object.keys(selectedAnswers).map((questionId) => ({
  //   question: questionId,
  //   answer: selectedAnswers[questionId],
  // }));
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      {isEdit ? (
        currentQuestion.options.map((option, index) => (
          <div className="form-check mb-3" key={index}>
            <ul className="list-group w-50">
              <li className="list-group-item">
                <input
                  type="radio"
                  className="form-check-input m-2"
                  name={`question${currentQuestionIndex}`}
                  value={option}
                  checked={
                    selectedAnswers[data[currentQuestionIndex]._id] === option
                  }
                  onChange={handleAnswerChange}
                />
                <label className="form-check-label">{option}</label>
              </li>
            </ul>
          </div>
        ))
      ) : (
        <>
          <div className="container mt-5">
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="mb-4 text-center">Start Exam</h2>
                <div className="form-group">
                  <label className="mb-2">
                    Question: {currentQuestionIndex + 1}
                  </label>
                  <h4 className="form-control">{currentQuestion.question}</h4>
                </div>
                <form>
                  <div className="form-group">
                    <label className="mb-2">Options:</label>
                    {currentQuestion &&
                      currentQuestion.options.map((option, index) => (
                        <div className="form-check mb-3" key={index}>
                          <ul className="list-group w-50">
                            <li className="list-group-item">
                              <input
                                type="radio"
                                className="form-check-input m-2"
                                name={`question${currentQuestionIndex}`}
                                value={option}
                                checked={
                                  selectedAnswers[
                                    data[currentQuestionIndex]._id
                                  ] === option
                                }
                                onChange={handleAnswerChange}
                              />
                              <label className="form-check-label">
                                {option}
                              </label>
                            </li>
                          </ul>
                        </div>
                      ))}
                  </div>
                </form>
              </div>
            </div>
            <div className="mb-3">
              <Button
                className="btn btn-primary me-2"
                onClick={handlePreviousClick}
                disabled={currentQuestionIndex === 0}
                buttonText={"Previous"}
              />
              {currentQuestionIndex === data.length - 1 ? (
                <Button
                  className="btn btn-success"
                  onClick={handleSubmit}
                  buttonText={"Review & Submit"}
                  disabled={isAnswerSelected === "false"}
                />
              ) : (
                <Button
                  className="btn btn-primary"
                  onClick={handleNextClick}
                  buttonText={"Next"}
                />
              )}
            </div>
            <ToastContainer autoClose={2000} theme="colored" />
          </div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
      )}
    </>
  );
};

export default ExamForStudent;
