import React, { Fragment, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../reusable/Button";
import Loader from "../../reusable/Loader";
import apiAction from "../../api/apiAction";
import { useLocation, useNavigate } from "react-router-dom";
import "../../App.css";
import Exam from "./Exam";
const GiveExam = () => {
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
  const totalQuestionCount = data.map((item) => item.question).length;
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
        <div>
          {data.map((item, questionIndex) => (
            <Fragment key={questionIndex}>
              <Exam
                totalQuestionCount={totalQuestionCount}
                key={questionIndex}
                questionIndex={questionIndex}
                question={item.question}
                options={item.options}
                selectedAnswer={selectedAnswers[item._id]}
                onAnswerChange={(e) => {
                  const questionId = data[questionIndex]._id;
                  const updatedSelectedAnswers = {
                    ...selectedAnswers,
                  };
                  updatedSelectedAnswers[questionId] = e.target.value;
                  setSelectedAnswers(updatedSelectedAnswers);
                }}
                answerEdit={answerEdit[questionIndex]}
              />
              <div className="text-center w-40 exam-responsive">
                <Button
                  buttonText={"edit answer"}
                  className={"btn btn-danger mb-3"}
                  onClick={() => handleEditAnswer(questionIndex)}
                />
              </div>
            </Fragment>
          ))}
          <div className="text-center w-75 mt-3 pt-3 mb-5">
            <Button
              buttonText={"Submit"}
              className={"btn btn-success"}
              onClick={handleSubmitExam}
            />
          </div>
        </div>
      ) : (
        <>
          {currentQuestion && (
            <>
              <Exam
                questionIndex={currentQuestionIndex}
                question={currentQuestion.question}
                options={currentQuestion.options}
                selectedAnswer={selectedAnswers[data[currentQuestionIndex]._id]}
                onAnswerChange={handleAnswerChange}
                answerEdit={true}
                totalQuestionCount={totalQuestionCount}
              />
              <div className="text-center w-50 exam-responsive">
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
                    className="btn btn-primary "
                    onClick={handleNextClick}
                    buttonText={"Next"}
                  />
                )}
              </div>
            </>
          )}

          <ToastContainer autoClose={2000} theme="colored" />
        </>
      )}
    </>
  );
};

export default GiveExam;
