import { useEffect, useState } from "react";
import UserResetPassword from "../user/UserResetPassword";
import apiAction from "../../api/apiAction";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
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
    const response = await apiAction({
      method: "get",
      url: "student/getStudentDetail",
      setLoading,
    });
    setData(response.data);
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
    await apiAction({
      method: "put",
      url: "student/studentProfile",
      setLoading,
      data: { name: data.name },
    });
    fetchStudentProfile();
    setLoading(true);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="container profile">
        <div className="row">
          <div className="col-md-12 d-flex justify-content-center align-items-center mt-5">
            <div class="btn-group" role="group" aria-label="Basic example">
              <Button
                type="button"
                class="btn btn-primary"
                buttonText={"Profile"}
                onClick={() => setToggle(!toggle)}
                disabled={toggle}
              ></Button>
              <Button
                type="button"
                class="btn btn-danger"
                buttonText={"Reset Password"}
                onClick={() => setToggle(!toggle)}
                disabled={!toggle}
              ></Button>
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
