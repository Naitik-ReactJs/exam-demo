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
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [toggle, setToggle] = useState(false);
  const [formErrors, setFormErrors] = useState(data);
  const input = UserProfileInputForm();
  const [isNameModified, setIsNameModified] = useState(false);

  const fetchStudentProfile = async () => {
    try {
      const response = await apiAction({
        method: "get",
        url: "student/getStudentDetail",
        setLoading,
      });
      setData(response.data);
    } catch (error) {
      toast.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchStudentProfile();
    setToggle(true);
  }, []);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    let error = validateInput(name, value);

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
    if (name === "name" && value !== data.name) {
      setIsNameModified(true);
    } else {
      setIsNameModified(false);
    }
  };

  const handleSubmit = async () => {
    toast.success("Please wait...");
    try {
      await apiAction({
        method: "put",
        url: "student/studentProfile",
        setLoading,
        data: { name: data.name },
      });
      fetchStudentProfile();
      setLoading(true);
    } catch (error) {
      toast.error("Error submitting data:", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="container profile">
        <div className="row">
          <div className="col-md-12 d-flex justify-content-center align-items-center mt-5">
            <div className="input-group mb-3 text-center">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <label className="input-group-text border-0">Profile</label>
                  <label className="switch">
                    <input
                      type="checkbox"
                      className="form-control"
                      onClick={() => setToggle(!toggle)}
                    />
                    <span className="slider"></span>
                  </label>
                  <label className="input-group-text border-0">
                    Reset Password
                  </label>
                </span>
              </div>
            </div>
          </div>
          {toggle ? (
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
                        name={field.key}
                        onChange={handleInputChange}
                        readOnly={field.readOnly}
                        placeholder="Enter your profile name"
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
          ) : (
            <div className="col-md">
              <UserResetPassword />
            </div>
          )}
        </div>
        <ToastContainer autoClose={2000} theme="colored" />
      </div>{" "}
    </>
  );
};

export default Profile;
