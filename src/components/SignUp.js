import React, { Fragment, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../reusable/Button";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InputSignUpForm } from "../utils/Input";
import validateInput from "../utils/Validation";
import apiAction from "../api/apiAction";

const SignUp = () => {
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
    apiAction(
      "post",
      "https://examination.onrender.com/users/SignUp",
      formData
    );
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

  const input = InputSignUpForm(
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
                        required
                        id={item.id}
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
