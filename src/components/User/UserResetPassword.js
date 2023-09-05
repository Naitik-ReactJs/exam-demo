import React, { Fragment, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../../reusable/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InputResetPassForm } from "../../utils/Input";
import validateInput from "../../utils/Validation";
import apiAction from "../../api/apiAction";
import Loader from "../../reusable/Loader";

const UserResetPassword = () => {
  const [loading, setLoading] = useState(false);

  const emptyUserData = {
    old_password: "",
    password: "",
    retype_password: "",
  };
  const [formData, setFormData] = useState({
    oldPassword: "",
    Password: "",
    ConfirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState(emptyUserData);

  const { old_password, password, retype_password } = formErrors;

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
  if (loading) {
    return <Loader />;
  }
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
      console.error("Error fetching data:", error);
    }
  };

  const input = InputResetPassForm(
    old_password,
    password,
    retype_password,
    handleInputChange
  );
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 ">
      <div className="container p-5 w-50 box-shadow">
        <h2 className="text-center p-3">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          {input.map((item, index) => {
            return (
              <Fragment key={index}>
                <input
                  required
                  className="form-control p-3 mt-4"
                  type={item.type}
                  name={item.name}
                  placeholder={item.placeholder}
                  onChange={item.onChange}
                />
                {item.formErrors && (
                  <div
                    key={index}
                    className="alert alert-danger m-3 border text-center p-2"
                    role="alert"
                  >
                    {item.formErrors}
                  </div>
                )}
              </Fragment>
            );
          })}
          <div className="text-center mt-4">
            <Button
              className={"btn btn-dark"}
              type="submit"
              buttonText={"Submit"}
              disabled={!Object.values(formErrors).every((item) => item === "")}
            ></Button>
          </div>
          <ToastContainer autoClose={2000} theme="colored" />
        </form>
      </div>
    </div>
  );
};

export default UserResetPassword;
