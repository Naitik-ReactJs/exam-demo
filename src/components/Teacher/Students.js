import React, { useEffect, useState } from "react";
import apiAction from "../../api/apiAction";
import Loader from "../../reusable/Loader";
import { Card, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../../reusable/Button";
const Students = () => {
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiAction({
          method: "get",
          url: "dashboard/Teachers",
          token: JSON.parse(localStorage.getItem("user-info"))?.token,
          setLoading,
          storageKey: "student-list",
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

  return (
    <div className="container py-5">
      {studentList.length === 0 ? (
        <Loader />
      ) : (
        <>
          {studentList.map((item, index) => (
            <Col xs={12} sm={6} md={4} lg={6} key={index}>
              <Card className="mb-2">
                <Card.Body>
                  <Card.Title>
                    <i className="pe-2 mr-2 bi bi-person-circle"></i>
                    {item.name}
                  </Card.Title>
                  <Card.Subtitle className="mb-2">
                    <i className="pe-2 mr-2 bi bi-envelope-at-fill"></i>
                    {item.email}
                  </Card.Subtitle>
                  <Card.Text>
                    {item.status === "Active" ? (
                      <>
                        <i className="pe-2 mr-2 bi bi-toggle-on"></i>
                        Status: {item.status}
                      </>
                    ) : (
                      <>
                        <i className="pe-2 mr-2 bi bi-toggle-off "></i>
                        Status: {item.status}
                      </>
                    )}
                  </Card.Text>
                </Card.Body>
                <Button
                  buttonText={"View detail"}
                  className={"btn btn-dark w-25 m-auto mb-2"}
                />
              </Card>
            </Col>
          ))}
        </>
      )}
    </div>
  );
};

export default Students;
