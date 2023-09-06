import React, { useState } from 'react';

const CreateExam = () => {
  const questionCount = 15;

  const initialQuestion = {
    question: '',
    options: ['', '', '', ''],
    answer: '',
    notes: '',
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [subjectName, setSubjectName] = useState('');
  const [questionData, setQuestionData] = useState(initialQuestion);

  const inputFields = [
    { type: 'text', name: 'question', label: `Question ${currentQuestionIndex + 1}`, placeholder: 'Enter Question here' },
    { type: 'text', name: 'options', label: 'Options', placeholders: ['Option 1', 'Option 2', 'Option 3', 'Option 4'] },
    { type: 'text', name: 'answer', label: 'Selected Answer', readOnly: true },
    { type: 'textarea', name: 'notes', label: 'Notes', rows: 3 },
  ];

  const handleInputChange = (event, optionIndex = null) => {
    const updatedQuestionData = { ...questionData };

    if (optionIndex !== null) {
      updatedQuestionData.options[optionIndex] = event.target.value;
    } else if (event.target.name === 'question') {
      updatedQuestionData.question = event.target.value;
    } else if (event.target.name === 'answer') {
      updatedQuestionData.answer = event.target.value;
    } else if (event.target.name === 'notes') {
      updatedQuestionData.notes = event.target.value;
    }

    setQuestionData(updatedQuestionData);
  };

  const handleSubjectChange = (event) => {
    setSubjectName(event.target.value);
  };

  const handleRadioChange = (optionIndex) => {
    const updatedQuestionData = { ...questionData };
    updatedQuestionData.answer = updatedQuestionData.options[optionIndex];
    setQuestionData(updatedQuestionData);
  };

  const handleNextClick = () => {
    if (currentQuestionIndex < questionCount - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQuestionData(initialQuestion); // Reset the question data when moving to the next question
    }
  };

  const handlePrevClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setQuestionData(initialQuestion); // Reset the question data when moving to the previous question
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <label>Subject Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Subject Name here"
              value={subjectName}
              onChange={handleSubjectChange}
            />
          </div>
          <div className="card mb-3">
            <div className="card-body">
              {inputFields.map((field, index) => (
                <div className="form-group" key={index}>
                  <label>{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea
                      className="form-control"
                      name={field.name}
                      rows={field.rows || 1}
                      value={questionData[field.name]}
                      onChange={(event) => handleInputChange(event)}
                    />
                  ) : (
                    <>
                      {field.name === 'options' ? (
                        <ul className="list-group">
                          {field.placeholders.map((placeholder, optionIndex) => (
                            <li key={optionIndex} className="list-group-item">
                              <div className="form-check">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  name="answer"
                                  checked={questionData.answer === questionData.options[optionIndex]}
                                  onChange={() => handleRadioChange(optionIndex)}
                                />
                                <input
                                  type="text"
                                  className="form-control"
                                  name={`option-${optionIndex + 1}`}
                                  placeholder={placeholder}
                                  value={questionData.options[optionIndex]}
                                  onChange={(event) => handleInputChange(event, optionIndex)}
                                />
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <input
                          type={field.type}
                          className="form-control"
                          name={field.name}
                          placeholder={field.placeholders && field.placeholders[index]}
                          readOnly={field.readOnly}
                          value={questionData[field.name]}
                          onChange={(event) => handleInputChange(event)}
                        />
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3">
            <button className="btn btn-secondary mr-2" onClick={handlePrevClick} disabled={currentQuestionIndex === 0}>
              Previous
            </button>
            <button className="btn btn-primary" onClick={handleNextClick} disabled={currentQuestionIndex === questionCount - 1}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateExam;
