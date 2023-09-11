import React, { useEffect, useState } from "react";
import UserResetPassword from "../user/UserResetPassword";
import apiAction from "../../api/apiAction";
import "../../App.css";
import Loader from "../../reusable/Loader";
import { UserProfileInputForm } from "../../utils/Input";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../reusable/Button";
import validateInput from "../../utils/Validation";

const Profile = () => {
  const token = JSON.parse(localStorage.getItem("user-info"))?.token;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [formErrors, setFormErrors] = useState(data);
  const input = UserProfileInputForm();
  const [isNameModified, setIsNameModified] = useState(false);

  const fetchStudentProfile = async () => {
    try {
      const response = await apiAction({
        method: "get",
        url: "student/getStudentDetail",
        token: token,
        setLoading,
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchStudentProfile();
  }, []);

  const handleInputChange = (key, value) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));

    let error = validateInput(key, value);

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [key]: error,
    }));
    if (key === "name" && value !== data.name) {
      setIsNameModified(true);
    } else {
      setIsNameModified(false);
    }
  };

  const handleSubmit = async () => {
    toast.success("Please wait...");
    try {
      const response = await apiAction({
        method: "put",
        url: "student/studentProfile",
        token: token,
        setLoading,
        data: { name: data.name },
      });
      toast.success(response.message);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container profile">
      <div className="row">
        <div className="col-md-6 d-text-center mt-5 pt-5">
          <h4>Profile:</h4>
          <div>
            {input &&
              input.map((field) => (
                <div className="form-group" key={field.key}>
                  <label>{field.label}:</label>
                  <input
                    type={field.type}
                    className={field.className}
                    value={data[field.key]}
                    onChange={(e) => {
                      handleInputChange(field.key, e.target.value);
                    }}
                    readOnly={field.readOnly}
                  />
                </div>
              ))}
            {formErrors.name && (
              <div
                className="alert alert-danger m-3 border text-center p-2"
                role="alert"
              >
                {formErrors.name}
              </div>
            )}
          </div>
          <Button
            className="btn btn-primary mt-3"
            onClick={handleSubmit}
            disabled={!isNameModified}
            buttonText={"Change Name"}
          ></Button>
        </div>
        <div className="col-md-10">
          <UserResetPassword />
        </div>
      </div>
      <ToastContainer autoClose={2000} theme="colored" />
    </div>
  );
};

export default Profile;
