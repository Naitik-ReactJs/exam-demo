import React, { useEffect, useState } from "react";
import apiAction from "../../api/apiAction";
import Loader from "../../reusable/Loader";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../../reusable/Button";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const ViewStudents = () => {
  const token = JSON.parse(sessionStorage.getItem("user-info"))?.token;
  const navigate = useNavigate();
  const [studentList, setStudentList] = useState([]);

  const [loading, setLoading] = useState(false);
  const fetchStudentData = async () => {
    try {
      const response = await apiAction({
        method: "get",
        url: "dashboard/Teachers/StudentForExam",
        token: token,
        setLoading,
      });

      setStudentList(response.data);
    } catch (error) {
      toast.error("Error fetching data:");
    }
  };
  useEffect(() => {
    fetchStudentData();
  }, []);
  if (loading) {
    return <Loader />;
  }
  const handleViewResultClick = async (id) => {
    navigate(`result?id=${id}`);
  };
  return (
    <div className="container py-5 ms-5">
      {studentList.length === 0 ? (
        <Loader />
      ) : (
        <div className="container fs-5">
          <div className="row">
            <div className="col d-flex flex-column">
              {studentList.map((item, index) => (
                <div key={index} className="card-design w-50">
                  <div>
                    <div className="pb-2">
                      <i className="pe-2 mr-2 bi bi-person-circle"></i>
                      {item.name}
                    </div>
                    <div className="pb-2">
                      <i className="pe-2 mr-2 bi bi-envelope-at-fill"></i>
                      {item.email}
                    </div>
                    <div className="pb-2">
                      <i className="pe-2 mr-2 bi bi-toggle-on"></i>
                      Status: {item.status}
                    </div>
                  </div>
                  <Button
                    buttonText={"View result"}
                    type="submit"
                    className={"btn btn-dark  m-auto mb-2"}
                    onClick={() => handleViewResultClick(item._id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <ToastContainer autoClose={2000} theme="colored" />
    </div>
  );
};

export default ViewStudents;
