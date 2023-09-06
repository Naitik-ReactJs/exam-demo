import React, { Fragment, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../../reusable/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InputSignInForm } from "../../utils/Input";
import validateInput from "../../utils/Validation";
import apiAction from "../../api/apiAction";
import Loader from "../../reusable/Loader";
const SignIn = () => {
  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem("user-info"))?.token &&
      JSON.parse(localStorage.getItem("user-info"))?.role
    ) {
      navigate(`/${JSON.parse(localStorage.getItem("user-info"))?.role}`);
    }
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const emptyUserData = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState(emptyUserData);
  const { email, password } = formErrors;
  const handleInputChange = (e) => {
    const target = e.target;
    const { name, value } = target;

    const error = validateInput(name, value);

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
    const response = await apiAction({
      method: "post",
      url: "users/Login",
      data: formData,
      setLoading,
      storageKey: "user-info",
    });
    if (response.statusCode === 200) {
      navigate(`${response.data.role}`, { replace: true });
    }
  };
  const input = InputSignInForm(email, password, handleInputChange);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 ">
      <div className="container p-5 w-50 mb-5 box-shadow">
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
            <NavLink className="forgotpass_link" to="/forgotpassword">
              Forgot password?
            </NavLink>
          </div>
          <div className="text-center">
            <Button
              className={"btn btn-dark mt-3 mb-4"}
              type="submit"
              buttonText={"Sign In"}
              disabled={!Object.values(formErrors).every((item) => item === "")}
            ></Button>
          </div>
          <div className="text-center ">
            <p> Don't have an account ? </p>
            <p> </p>
            <NavLink to="/signup">
              {" "}
              <Button
                className={"btn btn-dark"}
                type="submit"
                buttonText={"Sign Up"}
              ></Button>
            </NavLink>
            <ToastContainer autoClose={2000} theme="colored" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
