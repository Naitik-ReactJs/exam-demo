import { useEffect, useState } from "react";
import UserResetPassword from "../user/UserResetPassword";
import apiAction from "../../api/apiAction";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import Loader from "../../reusable/Loader";
import { UserProfileInputForm } from "../../utils/Input";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../reusable/Button";

import { useDispatch, useSelector } from "react-redux";
import fetchProfile from "../../redux/student/actions/UserProfile";
import { setIsNameModified } from "../../redux/student/actions/UserProfile";
import { setProfileData } from "../../redux/student/actions/UserProfile";
import { SEO } from "../../Helmet";

const Profile = () => {
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.student.profileContainer);

  const data = useSelector((state) => state.student.profileContainer);
  const [loading, setLoading] = useState(true);
  const isNameModified = useSelector((state) => state.student.nameEdit);

  const input = UserProfileInputForm();
  const formdata = {
    name: profileData?.name,
  };
  useEffect(() => {
    dispatch(fetchProfile(setLoading));
  }, []);

  const handleInputChange = (e) => {
    const { value, name } = e.target;

    dispatch(setProfileData({ [name]: value }));

    if (value !== profileData.name) {
      dispatch(setIsNameModified(true));
    }
  };

  const handleSubmit = async () => {
    if (data.name.length === 0) {
      toast.warning("Name cannot be empty");
      return false;
    }
    toast.success("Please wait...");

    const response = await apiAction({
      method: "put",
      url: "student/studentProfile",
      setLoading,
      data: formdata,
    });
    if (response) {
      dispatch(fetchProfile(setLoading));
    }
    setLoading(true);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <SEO title="Student profile" />
      <div className="container profile">
        <div className="row">
          <div className="col-md-12 mt-5">
            <div>
              <ul
                className="nav nav-tabs w-responsive"
                id="myTab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <Button
                    className="nav-link active"
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#home-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="home-tab-pane"
                    aria-selected="true"
                    buttonText={"Profile"}
                  ></Button>
                </li>
                <li className="nav-item" role="presentation">
                  <Button
                    className="nav-link"
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#profile-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="profile-tab-pane"
                    aria-selected="false"
                    buttonText={"Reset Password"}
                  ></Button>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home-tab-pane"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                  tabIndex="0"
                >
                  <div className="d-flex align-items-center justify-content-center user-resetpass">
                    <div className="w-60 d-text-center pt-5 m-5 m-md-0 p-5 box-shadow">
                      <h2 className="text-center mb-3">Profile</h2>
                      <div>
                        {input &&
                          input.map((field) => {
                            const { label, type, className, key, readOnly } =
                              field;
                            return (
                              <div className="form-group" key={field.key}>
                                <label>{label}:</label>
                                <input
                                  type={type}
                                  className={className}
                                  value={data[key]}
                                  name={field.key}
                                  onChange={handleInputChange}
                                  readOnly={readOnly}
                                  placeholder="Enter your profile name"
                                />
                              </div>
                            );
                          })}
                      </div>
                      <Button
                        className="btn btn-primary mt-3"
                        onClick={handleSubmit}
                        disabled={!isNameModified}
                        buttonText={"Change Name"}
                      ></Button>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="profile-tab-pane"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                  tabIndex="0"
                >
                  <div className="col-md">
                    <UserResetPassword />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ToastContainer autoClose={2000} theme="colored" />
        </div>{" "}
      </div>
    </>
  );
};

export default Profile;
