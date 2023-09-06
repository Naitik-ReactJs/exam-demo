export const InputForgotPassForm = (email, handleInputChange) => {
  return [
    {
      type: "email",
      name: "email",
      placeholder: "Enter your email address",
      formErrors: email,
      onChange: handleInputChange,
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
    },
    {
      type: "password",
      name: "ConfirmPassword",
      placeholder: "Re Enter your password",
      onChange: handleInputChange,
      formErrors: ConfirmPassword,
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
    },
    {
      type: "password",
      name: "Password",
      placeholder: "Enter your new password",
      onChange: handleInputChange,
      formErrors: Password,
    },
    {
      type: "password",
      name: "ConfirmPassword",
      placeholder: "Re Enter your new password",
      onChange: handleInputChange,
      formErrors: ConfirmPassword,
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
    },
    {
      type: "password",
      name: "password",
      placeholder: "Enter your password",
      onChange: handleInputChange,
      formErrors: password,
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

export const CreateExamInputForm = (currentQuestionIndex) => {
  return [
    {
      type: "text",
      name: "question",
      label: `Question ${currentQuestionIndex + 1}`,
      placeholder: "Enter Question here",
      className: "form-control",
    },
    {
      type: "text",
      name: "options",
      label: "Answers :",
      placeholders: ["Option 1", "Option 2", "Option 3", "Option 4"],
    },
    {
      type: "text",
      name: "answer",
      className: "form-control",
      label: "Selected Answer",
      readOnly: true,
    },
    {
      type: "textarea",
      name: "notes",
      label: "Notes",
      rows: 2,
      className: "form-control",
    },
  ];
};
