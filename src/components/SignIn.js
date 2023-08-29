import React, { Fragment, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../reusable/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InputSignIn } from "../utils/Input";
const SignIn = () => {
  const min_password_length = 6;
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
    const { name, value } = e.target;
    let error = "";
    switch (name) {
      case "email":
        if (
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          )
        ) {
          error = "Invalid email format";
        }
        break;
      case "password":
        if (value.length < min_password_length) {
          error = "Password must be at least 6 characters";
        }
        break;

      default:
        break;
    }
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
    const baseUrl = process.env.REACT_APP_API_URL;
    const endPoint = "users/Login";
    const url = `${baseUrl}${endPoint}`;
    try {
      const response = await axios.post(url, formData);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error);
    }
  };
  const input = InputSignIn(email, password, handleInputChange);

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
            <Link className="forgotpass_link" to="/forgotpassword">
              Forgot password?
            </Link>
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
            <Link to="/signup">
              {" "}
              <Button
                className={"btn btn-dark"}
                type="submit"
                buttonText={"Sign Up"}
              ></Button>
            </Link>
            <ToastContainer autoClose={2000} theme="colored" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
