import React, { useEffect, useState } from "react";
import apiAction from "../../api/apiAction";
import Loader from "../../reusable/Loader";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../../reusable/Button";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const ViewStudents = () => {
  const navigate = useNavigate();
  const [studentList, setStudentList] = useState([]);

  const [loading, setLoading] = useState(false);
  const fetchStudentData = async () => {
    try {
      const response = await apiAction({
        method: "get",
        url: "dashboard/Teachers/StudentForExam",
        token: JSON.parse(localStorage.getItem("user-info"))?.token,
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
  const handleOnClick = async (id) => {
    navigate(`result?id=${id}`);
  };
  return (
    <div className="container py-5 ms-5">
      {studentList.length === 0 ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="row d-flex justify-content-space-between">
            <div className="col custom-display">
              {studentList.map((item, index) => (
                <Card key={index} className="student-card">
                  <Card.Body>
                    <Card.Title className="pb-2">
                      <i className="pe-2 mr-2 bi bi-person-circle"></i>
                      {item.name}
                    </Card.Title>
                    <Card.Subtitle className="pb-2">
                      <i className="pe-2 mr-2 bi bi-envelope-at-fill"></i>
                      {item.email}
                    </Card.Subtitle>
                    <Card.Text className="pb-2">
                      <i className="pe-2 mr-2 bi bi-toggle-on"></i>
                      Status: {item.status}
                    </Card.Text>
                  </Card.Body>
                  <Button
                    buttonText={"View result"}
                    type="submit"
                    className={"btn btn-dark  m-auto mb-2"}
                    onClick={() => handleOnClick(item._id)}
                  />
                </Card>
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
