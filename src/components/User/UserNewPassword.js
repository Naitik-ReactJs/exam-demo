import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../../reusable/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InputNewPassForm } from "../../utils/Input";
import validateInput from "../../utils/Validation";
import apiAction from "../../api/apiAction";
import Loader from "../../reusable/Loader";
import { useLocation } from "react-router-dom";
import Form from "../../reusable/UserForm";
const UserNewPassword = () => {
  const location = new URLSearchParams(useLocation().search);
  const token = location.get("token");
  const [loading, setLoading] = useState(false);

  const emptyUserData = {
    Password: "",
    ConfirmPassword: "",
  };
  const [formData, setFormData] = useState({
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
    if (Object.values(formData).some((value) => value === "")) {
      toast.error("Please enter your details");
    } else {
      setLoading(true);
      apiAction({
        method: "post",
        url: `users/ForgotPassword/Verify?token=${token}`,
        data: formData,
        setLoading,
      });
    }
    e.preventDefault();
  };
  const input = InputNewPassForm(Password, ConfirmPassword, handleInputChange);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <div className="container p-5 w-50 mb-5 box-shadow">
        <h2 className="text-center p-2">New password</h2>
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

export default UserNewPassword;
