import React, { Fragment, useEffect, useState } from "react";
import apiAction from "../../api/apiAction";
import Loader from "../../reusable/Loader";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../../reusable/Button";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Teacher = () => {
  const navigate = useNavigate();
  const [viewExam, setViewExam] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = JSON.parse(localStorage.getItem("user-info"))?.token;
  const fetchExamData = async () => {
    try {
      const response = await apiAction({
        method: "get",
        url: "dashboard/Teachers/viewExam",
        token: token,
        setLoading,
      });

      setViewExam(response.data);
    } catch (error) {
      toast.error("Error fetching data:");
    }
  };
  useEffect(() => {
    fetchExamData();
  }, []);

  const handleViewExam = async (id) => {
    navigate(`view-exam?id=${id}`);
  };
  const handleEditExam = async (id) => {
    navigate(`edit-exam?id=${id}`);
  };
  const handleDeleteExam = async (id) => {
    toast.success("Please wait processing your request");
    try {
      const response = await apiAction({
        method: "delete",
        url: "dashboard/Teachers/deleteExam",
        token: token,
        id,
        setLoading,
      });
      if (response.statusCode === 200) {
        fetchExamData();
      }
    } catch (error) {
      toast.error("Error fetching data:");
    }
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container ms-0 py-5">
      {viewExam.length === 0 ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="row d-flex justify-content-space-around">
            <div className="col custom-display">
              {viewExam.map((item, index) => (
                <Card key={index} className="m-2 w-50">
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
                      className={"btn btn-dark w-25 m-auto mb-2"}
                      onClick={() => handleViewExam(item._id)}
                    />
                    <Button
                      buttonText={"Edit Exam"}
                      className={"btn btn-dark w-25 m-auto mb-2 ms-2"}
                      onClick={() => handleEditExam(item._id)}
                    />
                    <Button
                      buttonText={"Delete Exam"}
                      className={"btn btn-dark w-25 m-auto mb-2 ms-2"}
                      onClick={() => handleDeleteExam(item._id)}
                    />
                  </div>
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

export default Teacher;
