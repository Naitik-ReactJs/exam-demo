import React, { useEffect, useState } from "react";
import apiAction from "../../api/apiAction";
import Loader from "../../reusable/Loader";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../../reusable/Button";
import "../../App.css";
import { useNavigate } from "react-router-dom";
const ViewStudents = () => {
  const navigate = useNavigate();
  const [studentList, setStudentList] = useState([]);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiAction({
          method: "get",
          url: "dashboard/Teachers/StudentForExam",
          token: JSON.parse(localStorage.getItem("user-info"))?.token,
          setLoading,
        });

        setStudentList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  if (loading) {
    return <Loader />;
  }
  const handleOnClick = async (id) => {
    localStorage.setItem("student-id", id);
    navigate("result");
  };
  return (
    <div className="container py-5 ms-5">
      {studentList.length === 0 ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="row d-flex justify-content-space-around">
            <div className="col custom-display">
              {studentList.map((item, index) => (
                <Card className="card" key={index}>
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
    </div>
  );
};

export default ViewStudents;
