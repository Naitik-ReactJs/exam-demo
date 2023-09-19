import React, { useState } from "react";
import apiAction from "../../api/apiAction";
import Loader from "../../reusable/Loader";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../reusable/Button";
import { CreateExamInputForm } from "../../utils/Input";
import { handleExamError } from "../../utils/Validation";
import ExamForm from "../../reusable/ExamForm";
import { useNavigate } from "react-router-dom";

const CreateExam = () => {
  const [notesText, setNotesText] = useState("");
  const [addNotes, setAddNotes] = useState([]);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const initialQuestions = Array.from({ length: 15 }, () => ({
    question: "",
    answer: "",
    options: ["", "", "", ""],
  }));
  const [questions, setQuestions] = useState(initialQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(15).fill(""));
  const [examData, setExamData] = useState({
    subjectName: "",
  });
  const { subjectName } = examData;
  const formData = {
    subjectName: subjectName,
    questions: questions,
    notes: [...addNotes],
  };

  const [formErrors, setFormErrors] = useState({
    subjectError: "",
    questionError: "",
    optionError: "",
    selectedAnsError: "",
    notesError: "",
  });
  const {
    subjectError,
    questionError,
    optionError,
    selectedAnsError,
    notesError,
  } = formErrors;
  const handleNextClick = () => {
    const error = handleExamError(
      setFormErrors,
      questions,
      currentQuestionIndex,
      examData,
      selectedAnswers,
      addNotes
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
    setFormErrors("");
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

  const handleQuestionChange = (e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].question = e.target.value;
    setQuestions(updatedQuestions);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      questionError: "",
    }));
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

  const handleSubmit = async () => {
    const error = handleExamError(
      setFormErrors,
      questions,
      currentQuestionIndex,
      examData
    );

    if (error) {
      setLoading(true);
      try {
        const response = await apiAction({
          method: "post",
          url: "dashboard/Teachers/Exam",
          data: formData,
          setLoading,
        });
        if (response.statusCode === 200) {
          navigate("/teacher");
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  const input = CreateExamInputForm(
    examData,
    handleSubjectNameChange,
    currentQuestionIndex,
    questions,
    handleQuestionChange,
    handleAnswerChange,
    selectedAnswers,
    subjectError,
    questionError,
    optionError,
    selectedAnsError
  );

  const handleNotesChange = (e) => {
    const { name, value } = e.target;
    setNotesText(value);
    setExamData({
      ...examData,
      notes: e.target.value,
    });
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      notesError: "",
    }));
  };
  const handleAddNotes = () => {
    const filtered = addNotes.filter(
      (item, index) => item && item === notesText
    );
    console.log(filtered);
    if (notesText.trim() === "") {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        notesError: "notes is required",
      }));
    } else if (filtered.length !== 0) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        notesError: "error notes same",
      }));

      return false;
    } else {
      setAddNotes([...addNotes, notesText]);
      setNotesText("");
    }
  };
  const handleDeleteNotes = (index) => {
    const newNotes = [...addNotes];
    newNotes.splice(index, 1);
    setAddNotes(newNotes);
  };
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
        <div>
          <label>Notes:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter notes at last question"
            value={notesText}
            name="notes"
            onChange={handleNotesChange}
          />
          {notesError && (
            <div className="alert text-center alert-danger w-75 mt-4">
              {notesError}{" "}
            </div>
          )}
          <Button
            className="btn btn-primary mt-2"
            // disabled={currentQuestionIndex !== 14}
            buttonText={"Add Another note"}
            onClick={handleAddNotes}
          />
          {addNotes.map((item, index) => {
            return (
              <li key={index}>
                {item}{" "}
                <span>
                  {" "}
                  <Button
                    className="btn btn-sm mt-2 mx-5"
                    // disabled={currentQuestionIndex !== 14}
                    buttonText={"❌"}
                    onClick={(index) => handleDeleteNotes(index)}
                  />
                </span>{" "}
              </li>
            );
          })}
        </div>
      </div>

      <div className="mb-3">
        <Button
          className="btn btn-primary me-2"
          onClick={handlePreviousClick}
          disabled={currentQuestionIndex === 0}
          buttonText={"Previous"}
        />
        {currentQuestionIndex === 14 ? (
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
        <pre>{JSON.stringify(addNotes)}</pre>
      </div>
      <ToastContainer autoClose={2000} theme="colored" />
    </div>
  );
};

export default CreateExam;
