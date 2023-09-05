import React, { Fragment, useEffect, useState } from "react";
import apiAction from "../../api/apiAction";
import Loader from "../../reusable/Loader";
import { Card } from "react-bootstrap";
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

        setViewExam(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleSubmit = () => {
    navigate("/teacher/exam");
  };
  const handleOnClick = async (id) => {
    try {
      apiAction({
        method: "get",
        url: "dashboard/Teachers/examDetail",
        token: JSON.parse(localStorage.getItem("user-info"))?.token,
        id,
        setLoading,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="container ms-0 py-5">
      <Button
        buttonText={"Create Exam"}
        className={"btn btn-dark w-25 p-2 ms-4"}
        onClick={handleSubmit}
      />
      {viewExam.length === 0 ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="row d-flex justify-content-space-around">
            <div className="col custom-display">
              {viewExam.map((item, index) => (
                <Card key={index}>
                  <Card.Body>
                    <Card.Title className="pb-2">
                      <i className="pe-2 mr-2 bi bi-book"></i>
                      Subject: {item.subjectName}
                    </Card.Title>
                    <Card.Subtitle className="pb-2">
                      <i className="pe-2 mr-2 bi bi-envelope-at-fill"></i>
                      E-mail: {item.email}
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
                      className={"btn btn-dark w-50 m-auto mb-2"}
                      onClick={() => handleOnClick(item._id)}
                    />
                    <Button
                      buttonText={"Edit Exam"}
                      className={"btn btn-dark w-50 m-auto mb-2 ms-2"}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teacher;
