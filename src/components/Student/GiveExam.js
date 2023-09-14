import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../reusable/Button";
import Loader from "../../reusable/Loader";
import apiAction from "../../api/apiAction";
import { useLocation, useNavigate } from "react-router-dom";

const GiveExam = () => {
  const token = JSON.parse(sessionStorage.getItem("user-info"))?.token;
  const [isEdit, setIsEdit] = useState(false);
  const [answerEdit, setAnswerEdit] = useState({});
  const [loading, setLoading] = useState(true);
  const location = new URLSearchParams(useLocation().search);
  const id = location.get("id");
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [data, setData] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState(
    new Array(data.length).fill("")
  );
  const currentQuestion = data[currentQuestionIndex];
  const formData = Object.keys(selectedAnswers).map((questionId) => ({
    question: questionId,
    answer: selectedAnswers[questionId],
  }));
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
  };

  const handleReviewClick = () => {
    const selectedAnswer = selectedAnswers[data[currentQuestionIndex]._id];
    if (selectedAnswer) {
      setIsEdit(true);
    } else {
      toast.error("Please select an answer before proceeding.");
    }
  };

  const handleEditAnswer = (id) => {
    setAnswerEdit(() => ({ [id]: true }));
  };
  const handleSubmitExam = () => {
    try {
      apiAction({
        method: "post",
        url: "student/giveExam",
        token: token,
        id,
        data: formData,
        setLoading,
      });
      navigate("/student");
    } catch (error) {
      toast.error("Error fetching data:", error);
    }
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {isEdit ? (
        <>
          {data.map((item, questionIndex) => {
            return (
              <div className="card-body" key={questionIndex}>
                {" "}
                <div className="form-group w-50">
                  <label className="mb-2">Question: {questionIndex + 1}</label>
                  <h4 className="form-control">{item.question}</h4>
                </div>
                {item &&
                  item.options.map((option, index) => (
                    <div className="form-check mb-3" key={index}>
                      <ul className="list-group w-50">
                        <li className="list-group-item">
                          <form>
                            <input
                              type="radio"
                              className="form-check-input m-2"
                              name={`question${index}`}
                              value={option}
                              checked={
                                Object.values(selectedAnswers)[
                                  questionIndex
                                ] === option
                              }
                              onChange={(e) => {
                                const questionId = data[questionIndex]._id;
                                const updatedSelectedAnswers = {
                                  ...selectedAnswers,
                                };
                                updatedSelectedAnswers[questionId] =
                                  e.target.value;
                                setSelectedAnswers(updatedSelectedAnswers);
                              }}
                              disabled={!answerEdit[questionIndex]}
                            />
                            <label className="form-check-label">{option}</label>
                          </form>
                        </li>
                      </ul>
                    </div>
                  ))}
                <Button
                  buttonText={"edit answer"}
                  className={"btn btn-danger mb-3"}
                  onClick={() => handleEditAnswer(questionIndex)}
                />
              </div>
            );
          })}
          <Button
            buttonText={"Submit"}
            className={"btn btn-success"}
            onClick={handleSubmitExam}
          />
        </>
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
                className="btn btn-danger me-2"
                onClick={handlePreviousClick}
                disabled={currentQuestionIndex === 0}
                buttonText={"Previous"}
              />
              {currentQuestionIndex === data.length - 1 ? (
                <Button
                  className="btn btn-success"
                  onClick={handleReviewClick}
                  buttonText={"Review & Submit"}
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
        </>
      )}
    </>
  );
};

export default GiveExam;
