import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../../reusable/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InputResetPassForm } from "../../utils/Input";
import validateInput from "../../utils/Validation";
import apiAction from "../../api/apiAction";
import Loader from "../../reusable/Loader";
import Form from "../../reusable/UserForm";

const UserResetPassword = () => {
  const [loading, setLoading] = useState(false);

  const emptyUserData = {
    old_password: "",
    Password: "",
    ConfirmPassword: "",
  };
  const [formData, setFormData] = useState({
    oldPassword: "",
    Password: "",
    ConfirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState(emptyUserData);

  const { Password, ConfirmPassword } = formErrors;

  const handleInputChange = (e) => {
    const target = e.target;
    const { name, value } = target;
    const error = validateInput(name, value, formData.Password);

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

    try {
      const response = await apiAction({
        method: "post",
        url: "users/ResetPassword",
        data: formData,
        token: JSON.parse(localStorage.getItem("user-info"))?.token,
        setLoading,
      });

      toast.success(response.message);
    } catch (error) {
      toast.error("Error fetching data:");
    }
  };

  const input = InputResetPassForm(
    Password,
    ConfirmPassword,
    handleInputChange
  );
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 ">
      <div className="container p-5 w-50 box-shadow">
        <h2 className="text-center p-3">Reset Password</h2>
        <Form inputFields={input} />
        <div className="text-center mt-4">
          <Button
            className={"btn btn-dark"}
            type="submit"
            buttonText={"Submit"}
            onClick={handleSubmit}
            disabled={!Object.values(formErrors).every((item) => item === "")}
          ></Button>
        </div>
        <ToastContainer autoClose={2000} theme="colored" />
      </div>
    </div>
  );
};

export default UserResetPassword;
