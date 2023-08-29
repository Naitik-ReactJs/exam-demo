import React, { Fragment, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../reusable/Button";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InputSignUp } from "../utils/Input";
const SignUp = () => {
  const min_password_length = 6;
  const min_length = 2;
  const emptyUserData = {
    name: "",
    email: "",
    password: "",
    role: "",
  };

  const [formErrors, setFormErrors] = useState(emptyUserData);
  const { name, email, password } = formErrors;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    const baseUrl = process.env.REACT_APP_API_URL;
    const endPoint = "users/SignUp";
    const url = `${baseUrl}${endPoint}`;

    try {
      const response = await axios.post(url, formData);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error);
    }
  };
  const [selectedRole, setSelectedRole] = useState("");

  const handleRadioChange = (e) => {
    setSelectedRole(e.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      role: e.target.value,
    }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let error = "";
    switch (name) {
      case "name":
        if (value.trim().length < min_length) {
          error = "Name must be at least 2 characters";
        } else if (!/^[a-zA-Z\s]*$/.test(value)) {
          error = "Name cannot contain numbers or special characters";
        }
        break;

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

  const input = InputSignUp(
    name,
    email,
    password,
    handleInputChange,
    handleRadioChange
  );

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 ">
      <div className="container p-5 w-50 mb-5 box-shadow">
        <form onSubmit={handleSubmit}>
          {input.map((item, index) => {
            return (
              <Fragment key={index}>
                {item.type === "radio" ? (
                  <>
                    <label>{item.role}</label>
                    <label key={item.id} className="p-2 mb-4" htmlFor={item.id}>
                      <input
                        id={item.id}
                        required
                        checked={selectedRole === item.id}
                        value={item.id}
                        type={item.type}
                        onChange={handleRadioChange}
                      />
                      {item.label}
                    </label>
                  </>
                ) : (
                  <input
                    required
                    className={item.className}
                    type={item.type}
                    name={item.name}
                    placeholder={item.placeholder}
                    onChange={item.onChange}
                  />
                )}

                {item.formErrors && (
                  <div
                    key={index}
                    className="alert text-center alert-danger border text-center w-50"
                    role="alert"
                  >
                    {item.formErrors}
                  </div>
                )}
              </Fragment>
            );
          })}
          <div className="text-center mt-3">
            {" "}
            <Button
              className={"btn btn-dark"}
              type="submit"
              buttonText={"Sign Up"}
              disabled={!Object.values(formErrors).every((item) => item === "")}
            />
            <Button
              className={"btn btn-dark mx-4"}
              type="reset"
              buttonText={"Reset"}
              onClick={() => setFormData(emptyUserData)}
            ></Button>
          </div>
          <ToastContainer autoClose={2000} theme="colored" />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
