import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../../reusable/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InputSignUpForm } from "../../utils/Input";
import validateInput from "../../utils/Validation";
import apiAction from "../../api/apiAction";
import { useNavigate } from "react-router-dom";
import Loader from "../../reusable/Loader";
import Form from "../../reusable/UserForm";
import "../../App.css";
const SignUp = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");
  const [radioError, setRadioError] = useState(false);
  const radioErrorMessage = "Please select a role";
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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(formData).some((value) => value === "")) {
      toast.error("Please enter your details");
    } else if (selectedRole === "") {
      setRadioError(true);
      return false;
    } else {
      setLoading(true);

      const response = await apiAction({
        method: "post",
        url: "users/SignUp",
        data: formData,
        navigate,
        setLoading,
      });
      if (response.statusCode === 200) {
        toast.success(response.message);
      }
    }
    setSelectedRole("");
  };

  const handleRadioChange = (e) => {
    setSelectedRole(e.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      role: e.target.value,
    }));
    setRadioError(false);
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
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 m-3 m-md-0 ">
      <div className=" p-5 w-40  box-shadow ">
        <Form
          handleRadioChange={handleRadioChange}
          inputFields={input}
          selectedRole={selectedRole}
        />
        {radioError && (
          <div
            className="alert text-center alert-danger border text-center w-50"
            role="alert"
          >
            {radioErrorMessage}
          </div>
        )}
        <div className="text-center mt-3">
          {" "}
          <Button
            className={"btn btn-dark"}
            type="submit"
            onClick={handleSubmit}
            buttonText={"Sign Up"}
            disabled={!Object.values(formErrors).every((item) => item === "")}
          />
        </div>
        <ToastContainer autoClose={2000} theme="colored" />
      </div>
    </div>
  );
};

export default SignUp;
