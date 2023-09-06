import React, { useState } from "react";
import Button from "../../reusable/Button";
import "../../App.css";
import apiAction from "../../api/apiAction";
import Loader from "../../reusable/Loader";
import { ToastContainer, toast } from "react-toastify";
import { CreateExamInputForm } from "../../utils/Input";
const CreateExam = () => {
  const questionCount = 15;
  const [loading, setLoading] = useState(false);
  const initialQuestion = {
    question: "",
    answer: "",
    options: ["", "", "", ""],
    notes: "",
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [subjectName, setSubjectName] = useState("");
  const [questionData, setQuestionData] = useState(initialQuestion);
  const { question, answer, options, notes } = questionData;
  const input = CreateExamInputForm(currentQuestionIndex);
  const formData = {
    subjectName: subjectName,
    questions: [{ question: question, answer: answer, options: options }],
    notes: [notes],
  };

  const handleInputChange = (e, optionNumber = null) => {
    const updatedQuestionData = { ...questionData };

    if (optionNumber !== null) {
      updatedQuestionData.options[optionNumber] = e.target.value;
    } else if (e.target.name === "question") {
      updatedQuestionData.question = e.target.value;
    } else if (e.target.name === "answer") {
      updatedQuestionData.answer =
        questionData.answer === questionData.options[optionNumber];
    } else if (e.target.name === "notes") {
      updatedQuestionData.notes = e.target.value;
    }

    setQuestionData(updatedQuestionData);
  };

  const handleSubjectChange = (e) => {
    setSubjectName(e.target.value);
  };

  const handleRadioChange = (optionNumber) => {
    const updatedQuestionData = { ...questionData };
    updatedQuestionData.answer = updatedQuestionData.options[optionNumber];
    setQuestionData(updatedQuestionData);
  };

  const handleNextClick = () => {
    if (currentQuestionIndex < questionCount - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQuestionData(initialQuestion);
    }
  };

  const handlePrevClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setQuestionData(initialQuestion);
    }
  };
  const handleSubmit = async (e) => {
    const token = JSON.parse(localStorage.getItem("user-info"))?.token;
    setLoading(true);
    e.preventDefault();
    try {
      apiAction({
        method: "post",
        url: "dashboard/Teachers/Exam",
        data: formData,
        setLoading,
        token,
      });
    } catch (error) {
      toast.error(error);
    }
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card mb-4">
            <div className="card-body">
              <div className="form-group w-50 ">
                <label className="p-1">Subject Name :</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Subject Name here"
                  value={subjectName}
                  disabled={currentQuestionIndex !== 0}
                  onChange={handleSubjectChange}
                />
              </div>
              {input.map((field, index) => (
                <div className="form-group" key={index}>
                  {field.type === "textarea" ? (
                    <>
                      {currentQuestionIndex !== 14 ? (
                        <></>
                      ) : (
                        <div>
                          <label className="p-2 mt-2">{field.label}</label>
                          <textarea
                            className={field.className}
                            name={field.name}
                            rows={field.rows || 1}
                            value={questionData[field.name]}
                            onChange={(e) => handleInputChange(e)}
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <label className="p-2 mt-2">{field.label}</label>

                      {field.name === "options" ? (
                        <ul>
                          {field.placeholders.map(
                            (placeholder, optionNumber) => (
                              <li
                                key={optionNumber}
                                className="list-group-item p-1 w-50 m-2"
                              >
                                <div className="form-check">
                                  <input
                                    type="radio"
                                    className="form-check-input"
                                    name="answer"
                                    checked={
                                      questionData.answer ===
                                      questionData.options[optionNumber]
                                    }
                                    onChange={() =>
                                      handleRadioChange(optionNumber)
                                    }
                                  />
                                  <input
                                    type="text"
                                    className="form-control"
                                    name={`option-${optionNumber + 1}`}
                                    placeholder={placeholder}
                                    value={questionData.options[optionNumber]}
                                    onChange={(e) =>
                                      handleInputChange(e, optionNumber)
                                    }
                                  />
                                </div>
                              </li>
                            )
                          )}
                        </ul>
                      ) : (
                        <input
                          type={field.type}
                          className={field.className}
                          name={field.name}
                          placeholder={
                            field.placeholders && field.placeholders[index]
                          }
                          readOnly={field.readOnly}
                          value={questionData[field.name]}
                          onChange={(e) => handleInputChange(e)}
                        />
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>{" "}
          <div className="ms-auto">
            <Button
              className="btn btn-dark me-5"
              onClick={handlePrevClick}
              disabled={currentQuestionIndex === 0}
              buttonText={"Previous"}
            />
            {currentQuestionIndex === questionCount - 1 ? (
              <Button
                className={"btn btn-primary"}
                buttonText={"Submit"}
                onClick={handleSubmit}
              />
            ) : (
              <Button
                className={"btn btn-primary"}
                onClick={handleNextClick}
                disabled={currentQuestionIndex === questionCount - 1}
                buttonText={"Next"}
              />
            )}
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2000} theme="colored" />
    </div>
  );
};

export default CreateExam;
