import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../../reusable/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InputResetPassForm } from "../../utils/Input";
import validateInput from "../../utils/Validation";
import apiAction from "../../api/apiAction";
import Loader from "../../reusable/Loader";
import Form from "../../reusable/UserForm";
import "../../App.css";

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
    e.preventDefault();
    if (Object.values(formData).some((value) => value === "")) {
      toast.error("Please enter your details");
    } else {
      setLoading(true);
      const response = await apiAction({
        method: "post",
        url: "users/ResetPassword",
        data: formData,
        token: JSON.parse(sessionStorage.getItem("user-info"))?.token,
        setLoading,
      });
      toast.success(response.message);
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
    <div className="container ">
      <div className="d-flex align-items-center justify-content-center user-resetpass">
        <div className="p-5 box-shadow w-60">
          <h2 className="text-center pb-5">Reset Password</h2>
          <Form inputFields={input} />
          <div className="text-center">
            <Button
              className={"btn btn-success mt-2"}
              type="submit"
              buttonText={"Submit"}
              onClick={handleSubmit}
              disabled={!Object.values(formErrors).every((item) => item === "")}
            ></Button>
          </div>
          <ToastContainer autoClose={2000} theme="colored" />
        </div>
      </div>
    </div>
  );
};

export default UserResetPassword;
