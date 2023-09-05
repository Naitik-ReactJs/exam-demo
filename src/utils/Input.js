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

export const createExamInput = (ans1, ans2, ans3, ans4) => {
  return [
    { type: "radio", name: "ans1", id: "ans1", value: ans1 },
    { type: "radio", name: "ans1", id: "ans2", value: ans2 },
    { type: "radio", name: "ans1", id: "ans3", value: ans3 },
    { type: "radio", name: "ans1", id: "ans4", value: ans4 },
    {
      type: "text",
      name: "subjectname",
      label: "Subject",
    },
    {
      type: "text",
      name: "question",
      label: "Question",
    },
  ];
};
