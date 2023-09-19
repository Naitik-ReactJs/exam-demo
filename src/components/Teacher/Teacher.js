import React, { useEffect, useState } from "react";
import apiAction from "../../api/apiAction";
import Loader from "../../reusable/Loader";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import Button from "../../reusable/Button";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DialogBox from "../../reusable/DialogBox";

const Teacher = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const [viewExam, setViewExam] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchExamData = async () => {
    try {
      const response = await apiAction({
        method: "get",
        url: "dashboard/Teachers/viewExam",
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
    try {
      const reponse = await apiAction({
        method: "delete",
        url: "dashboard/Teachers/deleteExam",
        id,
        setLoading,
      });
      if (reponse.statusCode === 200) {
        fetchExamData();
      }
      setLoading(true);
    } catch (error) {
      toast.error("Error fetching data:");
    }
    handleClose();
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="container mt-4 text-center">
        <div className="row">
          {viewExam.map((item, index) => (
            <div key={index} className="col-lg-6  mb-5 w-50 exam-design">
              <div className="row me-1">
                <div className="card card-hover-effect">
                  <div className="card-body">
                    <div className="text-start fs-5 lead">
                      <p className="card-title p-1">
                        <i className="pe-2 mr-2 bi bi-book"></i>Subject:{" "}
                        {item.subjectName}
                      </p>
                      <p className="card-title p-1">
                        <i className="pe-2 mr-2 bi bi-envelope-at-fill"></i>
                        Email: {item.email}
                      </p>

                      <h6 className="card-title p-1">
                        <i className="pe-2 mr-2 bi bi-card-list"></i>Notes:
                      </h6>
                    </div>
                    <ul className="list-group">
                      {item.notes.map((note, noteIndex) => (
                        <li key={noteIndex} className="list-group-item">
                          {note}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 text-center">
                      <Button
                        buttonText={"View Exam"}
                        className={"btn btn-dark m-auto mb-2"}
                        onClick={() => handleViewExam(item._id)}
                      />
                      <Button
                        buttonText={"Edit Exam"}
                        className={"btn btn-dark  m-auto mb-2 ms-2"}
                        onClick={() => handleEditExam(item._id)}
                      />
                      <Button
                        buttonText={"Delete Exam"}
                        className={"btn btn-dark  m-auto mb-2 ms-2"}
                        onClick={handleShow}
                      />
                      <DialogBox
                        title={"Delete Exam!!"}
                        body={"Woohoo, Are you sure you want to delete !"}
                        show={show}
                        handleClose={handleClose}
                        action={() => handleDeleteExam(item._id)}
                        buttonText1={"Yes ✅"}
                        buttonText2={"No ❌"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer autoClose={2000} theme="colored" />
    </>
  );
};

export default Teacher;
