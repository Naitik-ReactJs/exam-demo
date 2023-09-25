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
export const isRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim() !== '';
  }

  return !!value; 
};

export const isUnique = (value, array) => {
  return array.indexOf(value) === -1;
};

export const handleExamError = ({
  questions,
  currentQuestionIndex,
  examData,
  selectedAnswers,
  addNotes,
  notesText,
}) => {
  const errors = {};

  if (!isRequired(examData.subjectName)) {
    errors.subjectError = 'Subject is required';
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (!isRequired(currentQuestion.question)) {
    errors.questionError = 'Question is required';
  } else {
    const currentQue = currentQuestion?.question;
    const filtered = questions?.filter(
      (item, index) =>
        item?.question === currentQue && index !== currentQuestionIndex
    );
    if (filtered.length !== 0) {
      errors.questionError = 'Unique question is required';
    }
  }
  if (
    !currentQuestion.options.map((item) => item).every((item) => item !== "")
  ) {
    errors.optionError= "Options are required"

  }
  if (!isRequired(selectedAnswers[currentQuestionIndex])) {
    errors.selectedAnsError = 'Answer is required';
  }

  if ( currentQuestionIndex === 14 && !isRequired(notesText)) {
    errors.notesError = 'Notes cannot be empty';
  } else if(currentQuestionIndex === 14 ) {
    const duplicateNotes = addNotes.includes(notesText);
    if (duplicateNotes ) {
      errors.notesError = 'Duplicate notes are not allowed';
    }
  }

  return errors;
};
