import { Fragment, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../reusable/Button";
import Loader from "../../reusable/Loader";
import apiAction from "../../api/apiAction";
import { useLocation, useNavigate } from "react-router-dom";
import "../../App.css";
import Exam from "./Exam";
import ExamPaper from "../../redux/student/actions/ExamPaper";
import { useDispatch, useSelector } from "react-redux";
import { totalExamQuestion } from "../../utils/Constants";
const GiveExam = () => {
  const location = new URLSearchParams(useLocation().search);
  const id = location.get("id");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.examPaperContainer);
  const [isEdit, setIsEdit] = useState(false);
  const [answerEdit, setAnswerEdit] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [selectedAnswers, setSelectedAnswers] = useState(
    new Array(data.length).fill("")
  );

  const currentQuestion = data[currentQuestionIndex];
  const formData = Object.keys(selectedAnswers).map((questionId) => ({
    question: questionId,
    answer: selectedAnswers[questionId],
  }));

  useEffect(() => {
    dispatch(ExamPaper(setLoading, id));
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
    const response = apiAction({
      method: "post",
      url: "student/giveExam",
      id,
      data: formData,
      setLoading,
    });
    if (response.statusCode === 200) {
      navigate("/student");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {isEdit ? (
        <div>
          {data &&
            data.map((item, questionIndex) => (
              <Fragment key={questionIndex}>
                <Exam
                  totalQuestionCount={totalExamQuestion}
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
                totalQuestionCount={totalExamQuestion}
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
          <pre>
            {JSON.stringify(data.map((item) => item.question).length, null, 2)}
          </pre>
          <ToastContainer autoClose={2000} theme="colored" />
        </>
      )}
    </>
  );
};

export default GiveExam;
