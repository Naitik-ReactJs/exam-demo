export const InputForgotPassForm = (email, handleInputChange) => {
  return [
    {
      type: "email",
      name: "email",
      placeholder: "Enter your email address",
      formErrors: email,
      onChange: handleInputChange,
      className: "form-control p-3 mt-3",
    },
  ];
};
export const InputNewPassForm = (
  Password,
  ConfirmPassword,
  handleInputChange
) => {
  return [
    {
      type: "password",
      name: "Password",
      placeholder: "Enter your password",
      onChange: handleInputChange,
      formErrors: Password,
      className: "form-control p-3 mt-3",
    },
    {
      type: "password",
      name: "ConfirmPassword",
      placeholder: "Re Enter your password",
      onChange: handleInputChange,
      formErrors: ConfirmPassword,
      className: "form-control p-3 mt-3",
    },
  ];
};
export const InputResetPassForm = (
  Password,
  ConfirmPassword,
  handleInputChange
) => {
  return [
    {
      type: "password",
      name: "oldPassword",
      placeholder: "Enter your old password",
      onChange: handleInputChange,
      className: "form-control p-3 mt-3",
    },
    {
      type: "password",
      name: "Password",
      placeholder: "Enter your new password",
      onChange: handleInputChange,
      formErrors: Password,
      className: "form-control p-3 mt-3",
    },
    {
      type: "password",
      name: "ConfirmPassword",
      placeholder: "Re Enter your new password",
      onChange: handleInputChange,
      formErrors: ConfirmPassword,
      className: "form-control p-3 mt-3",
    },
  ];
};

export const InputSignInForm = (email, password, handleInputChange) => {
  return [
    {
      type: "email",
      name: "email",
      placeholder: "Enter your email address",
      formErrors: email,
      onChange: handleInputChange,
      className: "form-control p-3 mt-4",
    },
    {
      type: "password",
      name: "password",
      placeholder: "Enter your password",
      onChange: handleInputChange,
      formErrors: password,
      className: "form-control p-3 mt-4",
    },
  ];
};
export const InputSignUpForm = (
  name,
  email,
  password,
  handleInputChange,
  handleRadioChange
) => {
  return [
    {
      type: "text",
      name: "name",
      placeholder: "Enter your name",
      formErrors: name,
      onChange: handleInputChange,
      className: "form-control p-3 mb-4",
    },
    {
      type: "email",
      name: "email",
      placeholder: "Enter your email address",
      formErrors: email,
      onChange: handleInputChange,
      className: "form-control p-3 mb-4",
    },
    {
      type: "password",
      name: "password",
      placeholder: "Enter your password",
      onChange: handleInputChange,
      formErrors: password,
      className: "form-control p-3 mb-4",
    },
    {
      id: "student",
      label: "Student",
      type: "radio",
      onChange: handleRadioChange,
      name: "role",
      role: "Role:",
    },
    {
      id: "teacher",
      label: "Teacher",
      type: "radio",
      onChange: handleRadioChange,
      name: "role",
    },
  ];
};

export const UserProfileInputForm = () => {
  return [
    {
      type: "text",
      label: "Name",
      key: "name",
      className: "form-control p-3 mb-3 ",
      readOnly: false,
    },
    {
      type: "text",
      label: "Email",
      key: "email",
      className: "form-control p-3 mb-3 custom-disabled",
      readOnly: true,
    },
    {
      type: "text",
      label: "Role",
      key: "role",
      className: "form-control p-3 mb-3 custom-disabled",
      readOnly: true,
    },
  ];
};

export const CreateExamInputForm = (
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
) => {
  return [
    {
      label: "Subject Name:",
      type: "text",
      placeholder: "Enter Subject Name here",
      value: examData.subjectName,
      onChange: handleSubjectNameChange,
      disabled: currentQuestionIndex !== 0,
      error: subjectError,
    },
    {
      label: "Question:",
      type: "text",
      placeholder: "Enter your question here",
      value: questions[currentQuestionIndex]?.question,
      onChange: handleQuestionChange,
      error: questionError,
    },
    {
      label: "Answers:",
      type: "radio",
      options: questions[currentQuestionIndex]?.options,
      onChange: handleAnswerChange,
      error: optionError,
      answer: questions[currentQuestionIndex]?.answer,
      name :"options"
    },
    {
      label: "Selected answer:",
      type: "text",
      placeholder: "Selected Answer",
      value: selectedAnswers[currentQuestionIndex],
      readOnly: true,
      error: selectedAnsError,
    },
  ];
};
