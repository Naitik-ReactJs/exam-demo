const Exam = ({
  questionIndex,
  question,
  options,
  selectedAnswer,
  onAnswerChange,
  answerEdit,
  totalQuestionCount,
}) => (
  <div className="container mt-5 exam-responsive">
    <div className="card mb-4">
      <div className="card-body" key={questionIndex}>
        <div className="form-group w-75 col-md-6">
          <label className="mb-2">Question: {questionIndex + 1}</label>
          <h4 className="form-control">{question}</h4>
        </div>
        {options &&
          options.map((option, index) => (
            <div className="form-check mb-3" key={index}>
              <ul className="list-group w-50">
                <li className="list-group-item">
                  <form>
                    <input
                      type="radio"
                      className="form-check-input m-2"
                      name={`question${index}`}
                      value={option}
                      checked={selectedAnswer === option}
                      onChange={onAnswerChange}
                      disabled={!answerEdit}
                    />
                    <label className="form-check-label">{option}</label>
                  </form>
                </li>
              </ul>
            </div>
          ))}
      </div>
      <div className="text-end m-2">
        <label className="alert alert-danger">
          {questionIndex + 1}/{totalQuestionCount}
        </label>
      </div>
    </div>
  </div>
);
export default Exam;
