import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../../reusable/Button";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InputForgotPassForm } from "../../utils/Input";
import validateInput from "../../utils/Validation";

import apiAction from "../../api/apiAction";
import Loader from "../../reusable/Loader";
import { useNavigate } from "react-router-dom";
import Form from "../../reusable/UserForm";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const emptyUserData = {
    email: "",
  };

  const [formErrors, setFormErrors] = useState(emptyUserData);
  const { email } = formErrors;
  const [formData, setFormData] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    const target = e.target;
    const { name, value } = target;

    let error = validateInput(name, value);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    apiAction({
      method: "post",
      url: "users/ForgotPassword",
      data: formData,
      setLoading,
      navigate,
    });
  };
  const input = InputForgotPassForm(email, handleInputChange);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <div className="container p-5 w-50 mb-5 box-shadow">
        <Form inputFields={input} />
        <div className="text-center mt-4">
          <Button
            className={"btn btn-dark"}
            type="submit"
            onClick={handleSubmit}
            buttonText={"Submit"}
            disabled={!Object.values(formErrors).every((item) => item === "")}
          ></Button>
        </div>
        <ToastContainer autoClose={2000} theme="colored" />
      </div>
    </div>
  );
};

export default ForgotPassword;
