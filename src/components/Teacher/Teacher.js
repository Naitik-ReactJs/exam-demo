import React, { Fragment, useEffect, useState } from "react";
import apiAction from "../../api/apiAction";
import Loader from "../../reusable/Loader";
import { Card, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../../reusable/Button";
import { useNavigate } from "react-router-dom";
const Teacher = () => {
  const navigate = useNavigate();
  const [viewExam, setViewExam] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiAction({
          method: "get",
          url: "dashboard/Teachers/viewExam",
          token: JSON.parse(localStorage.getItem("user-info"))?.token,
          setLoading,
        });
        console.log(response.data);
        setViewExam(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  if (loading) {
    return <Loader />;
  }
  const handleSubmit = () => {
    navigate("/teacher/exam");
  };

  return (
    <div className="container py-5">
      <Button
        buttonText={"Create Exam"}
        className={"btn btn-dark w-25 m-auto mb-2"}
        onClick={handleSubmit}
      />
      {viewExam.length === 0 ? (
        <Loader />
      ) : (
        <>
          {viewExam.map((item, index) => (
            <Col xs={12} sm={6} md={6} lg={6} key={index}>
              <Card className="mb-2">
                <Card.Body>
                  <Card.Title>
                    <i className="pe-2 mr-2 bi bi-person-circle"></i>
                    {item.subjectName}
                  </Card.Title>
                  <Card.Subtitle className="mb-2">
                    <i className="pe-2 mr-2 bi bi-envelope-at-fill"></i>
                    {item.email}
                  </Card.Subtitle>
                  <div>
                    <i className="pe-2 mr-2 bi bi-card-list"></i>Notes:{" "}
                    <ul className="ps-5">
                      {item.notes.map((note, index) => {
                        return (
                          <Fragment key={index}>
                            <li>{note}</li>
                          </Fragment>
                        );
                      })}
                    </ul>
                  </div>
                </Card.Body>
                <div className="text-center">
                  <Button
                    buttonText={"View Exam"}
                    className={"btn btn-dark w-25 m-auto mb-2"}
                  />
                  <Button
                    buttonText={"Edit Exam"}
                    className={"btn btn-dark w-25 m-auto mb-2 ms-2"}
                  />
                </div>
              </Card>
            </Col>
          ))}
        </>
      )}
    </div>
  );
};

export default Teacher;
