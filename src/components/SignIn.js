import React, { Fragment, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../reusable/Button";
import { Link } from "react-router-dom";
import axios from "axios";
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
    const apiUrl = process.env.REACT_APP_API_URL;
    const endpoint = "users/Login";
    const url = `${apiUrl}${endpoint}`;
console.log(url)
    try {
      const response = await axios.post(url, formData);
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  const input = [
    {
      type: "email",
      name: "email",
      placeholder: "Enter your email address",
      formErrors: formErrors.email,
      onChange: handleInputChange,
    },
    {
      type: "password",
      name: "password",
      placeholder: "Enter your password",
      onChange: handleInputChange,
      formErrors: formErrors.password,
    },
  ];

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 ">
      <div className="container p-5 w-25 mb-5 box-shadow">
        <form>
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
              onClick={handleSubmit}
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
