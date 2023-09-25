import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../../reusable/Button";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InputSignInForm } from "../../utils/Input";
import validateInput from "../../utils/Validation";
import apiAction from "../../api/apiAction";
import Loader from "../../reusable/Loader";
import Form from "../../reusable/UserForm";

const SignIn = () => {
  const token = JSON.parse(sessionStorage.getItem("user-info"))?.token;
  const role = JSON.parse(sessionStorage.getItem("user-info"))?.role;
  useEffect(() => {
    if (token && role) {
      navigate(`/${role}`);
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
    e.preventDefault();
    if (Object.values(formData).some((value) => value === "")) {
      toast.error("Please enter your details");
    } else {
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
    }
  };
  const input = InputSignInForm(email, password, handleInputChange);
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 ">
      <div className="container p-5 w-50 mb-5 box-shadow">
        <Form inputFields={input} />
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
            onClick={handleSubmit}
            disabled={!Object.values(formErrors).every((item) => item === "")}
          ></Button>
        </div>
        <div className="text-center ">
          <p> Don't have an account ? </p>
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
      </div>
    </div>
  );
};

export default SignIn;
