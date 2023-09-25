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
import {
  questionIndexIncrement,
  questionIndexDecrement,
} from "../../redux/student/actions/QuestionIndex";

import {
  setSelectedAnswers,
  setExamEdit,
  setAnswerEdit,
} from "../../redux/student/actions/GiveExam";
const GiveExam = () => {
  const [loading, setLoading] = useState(true);
  const location = new URLSearchParams(useLocation().search);
  const id = location.get("id");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.student.examPaperContainer);

  const currentQuestionIndex = useSelector(
    (state) => state.student.questionIndex
  );
  const selectedAnswers = useSelector((state) => state.student.selectedAnswers);
  const isEdit = useSelector((state) => state.student.isEdit);
  const answerEdit = useSelector((state) => state.student.answerEdit);

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
        dispatch(questionIndexIncrement(currentQuestionIndex));
      }
    } else {
      toast.error("Please select an answer before proceeding.");
    }
  };

  const handlePreviousClick = () => {
    if (currentQuestionIndex > 0) {
      dispatch(questionIndexDecrement(currentQuestionIndex));
    }
  };

  const handleAnswerChange = (e) => {
    const questionId = data[currentQuestionIndex]._id;
    const updatedSelectedAnswers = { ...selectedAnswers };
    updatedSelectedAnswers[questionId] = e.target.value;
    dispatch(setSelectedAnswers(updatedSelectedAnswers));
  };

  const handleReviewClick = () => {
    const selectedAnswer = selectedAnswers[data[currentQuestionIndex]._id];
    if (selectedAnswer) {
      dispatch(setExamEdit(true));
    } else {
      toast.error("Please select an answer before proceeding.");
    }
  };

  const handleEditAnswer = (id) => {
    dispatch(setAnswerEdit({ [id]: true }));
  };

  const handleSubmitExam = async () => {
    const response = await apiAction({
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
                    dispatch(setSelectedAnswers(updatedSelectedAnswers));
                    handleEditAnswer();
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
          {data && data[currentQuestionIndex] && (
            <>
              <Exam
                questionIndex={currentQuestionIndex}
                question={data[currentQuestionIndex].question}
                options={data[currentQuestionIndex].options}
                selectedAnswer={selectedAnswers[data[currentQuestionIndex]._id]}
                onAnswerChange={handleAnswerChange}
                totalQuestionCount={totalExamQuestion}
                answerEdit={true}
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
