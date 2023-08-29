import React, { Fragment, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../reusable/Button";
import axios from "axios";

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = process.env.REACT_APP_API_URL;
    const endpoint = "users/SignUp";
    const url = `${apiUrl}  ${endpoint}`;

    try {
      const response = await axios.post(url, formData);
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
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
  console.log(formData);

  const input = [
    {
      type: "text",
      name: "name",
      placeholder: "Enter your name",
      formErrors: formErrors.name,
      onChange: handleInputChange,
      className: "form-control p-3 mb-4",
    },
    {
      type: "email",
      name: "email",
      placeholder: "Enter your email address",
      formErrors: formErrors.email,
      onChange: handleInputChange,
      className: "form-control p-3 mb-4",
    },
    {
      type: "password",
      name: "password",
      placeholder: "Enter your password",
      onChange: handleInputChange,
      formErrors: formErrors.password,
      className: "form-control p-3 mb-4",
    },
  ];
  const roles = [
    {
      id: "student",
      label: "Student",
      type: "radio",
      onChange: handleRadioChange,
      name: "role",
    },
    {
      id: "teacher",
      label: "Teacher",
      type: "radio",
      onChange: handleRadioChange,
      name: "role",
    },
  ];

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 box-shadow">
      <div className="container p-5 w-50">
        <form>
          {input.map((item, index) => {
            return (
              <Fragment key={index}>
                <input
                  required
                  className={item.className}
                  type={item.type}
                  name={item.name}
                  placeholder={item.placeholder}
                  onChange={item.onChange}
                />
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
          <div>
            <label>Role:</label>
            {roles.map((role) => (
              <label key={role.id} className="p-2 mb-4" htmlFor={role.id}>
                <input
                  id={role.id}
                  required
                  checked={selectedRole === role.id}
                  value={role.id}
                  type={role.type}
                  onChange={handleRadioChange}
                />
                {role.label}
              </label>
            ))}
          </div>
          <div className="text-center mt-3">
            {" "}
            <Button
              className={"btn btn-dark"}
              type="submit"
              buttonText={"Sign Up"}
              onClick={handleSubmit}
              disabled={!Object.values(formErrors).every((item) => item === "")}
            ></Button>
            <Button
              className={"btn btn-dark mx-4"}
              type="reset"
              buttonText={"Reset"}
              onClick={() => setFormData(emptyUserData)}
            ></Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
