export default function validateInput(name, value, passwordValue) {
  const min_length = 2;
  const min_password_length = 6;
  let error = "";
  switch (name) {
    case "name":
      if (value.trim().length < min_length) {
        error = "Name must be at least 2 characters";
      } else if (!/^[a-zA-Z\s]*$/.test(value)) {
        error = "Name cannot contain numbers or special characters";
      }
      break;

    case "email":
      if (
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        )
      ) {
        error = "Invalid email format";
      }

      break;

    case "Password":
      if (value.length < min_password_length) {
        error = "Password must be at least 6 characters";
      }

      break;
    case "password":
      if (value.length < min_password_length) {
        error = "Password must be at least 6 characters";
      }

      break;

    case "ConfirmPassword":
      if (value !== passwordValue) {
        error = "Passwords do not match";
      }
      break;

    default:
      break;
  }

  return error;
}

export const handleExamError = (
  setFormErrors,
  questions,
  currentQuestionIndex,
  examData,
  selectedAnswers,
  notes
) => {
  const currentQuestion = questions[currentQuestionIndex];

  if (!examData.subjectName) {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      subjectError: "Subject is required",
    }));
    return false;
  } else if (!currentQuestion.question) {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      questionError: "Question is required",
    }));
    return false;
  } else if (
    !currentQuestion.options.map((item) => item).every((item) => item !== "")
  ) {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      optionError: "Options are required",
    }));
    return false;
  } else if (!selectedAnswers[currentQuestionIndex]) {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      selectedAnsError: "Answer is required",
    }));
    return false;
  } else if (notes === "" && currentQuestionIndex === 14) {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      notesError: "notes is required",
    }));
    return false;
  }
  return true;
};
