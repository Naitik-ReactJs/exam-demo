import { useDispatch } from "react-redux";

const ExamForm = ({
  inputField,
  currentQuestionIndex,
  questions,
  setQuestions,
  setFormErrors,
}) => {
  const dispatch = useDispatch()
  return (
    <div>
      {" "}
      <form>
        {inputField.map((field, index) => (
          <div className="form-group" key={index}>
            <label className="mt-2 mb-2">{field.label}</label>
            {field.type === "radio" ? (
              field.options.map((option, optionIndex) => (
                <div className="mb-3" key={optionIndex}>
                  <div className="form-check">
                    <input
                      required
                      type={field.type}
                      className="form-check-input"
                      name={`question${currentQuestionIndex}`}
                      value={option}
                      checked={field.answer && field.answer === option}
                      onChange={field.onChange}
                    />
                    <input
                      required
                      type="text"
                      className="form-control ms-2"
                      placeholder={`Option ${optionIndex + 1}`}
                      value={option}
                      onChange={(e) => {
                        const updatedQuestions = [...questions];
                        updatedQuestions[currentQuestionIndex].options[
                          optionIndex
                        ] = e.target.value;
                        dispatch(setQuestions(updatedQuestions));

                        setFormErrors((prevErrors) => ({
                          ...prevErrors,
                          optionError: "",
                        }));
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <>
                <input
                  type={field.type}
                  className={`form-control mb-3`}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={field.disabled}
                  readOnly={field.readOnly}
                />
              </>
            )}
            {field.error && (
              <div
                className="alert alert-danger m-3 border text-center p-2 w-50"
                role="alert"
              >
                {field.error}
              </div>
            )}
          </div>
        ))}
      </form>
    </div>
  );
};

export default ExamForm;
