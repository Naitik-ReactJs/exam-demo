import { Fragment, useEffect, useState } from "react";
import apiAction from "../../api/apiAction";
import Loader from "../../reusable/Loader";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import Button from "../../reusable/Button";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DialogBox from "../../reusable/DialogBox";
import fetchTeacherExam from "../../redux/teacher/actions/ViewTeacherExam";
import { useDispatch, useSelector } from "react-redux";

const Teacher = () => {
  const dispatch = useDispatch();
  const exams = useSelector((state) => state.teacher.teacherExamContainer);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchTeacherExam(setLoading));
  }, []);

  const handleViewExam = async (id) => {
    navigate(`view-exam?id=${id}`);
  };
  const handleEditExam = async (id) => {
    navigate(`edit-exam?id=${id}`);
  };
  const handleDeleteExam = async (id) => {
    const reponse = await apiAction({
      method: "delete",
      url: "dashboard/Teachers/deleteExam",
      id,
      setLoading,
    });
    if (reponse.statusCode === 200) {
      dispatch(fetchTeacherExam(setLoading));
    }
    setLoading(true);
    handleClose();
  };
  if (loading) {
    return <Loader />;
  }
  const examActionButtons = [
    {
      buttonText: "View Exam",
      className: "btn btn-dark m-auto mb-2",
      onClick: (id) => handleViewExam(id),
    },
    {
      buttonText: "Edit Exam",
      className: "btn btn-dark m-auto mb-2",
      onClick: (id) => handleEditExam(id),
    },
    {
      buttonText: "Delete Exam",
      className: "btn btn-dark m-auto mb-2",
      onClick: handleShow,
    },
  ];

  return (
    <>
      <div className="container mt-4 text-center">
        <div className="row">
          {exams &&
            exams.map((exam, index) => (
              <div key={index} className="col-lg-6  mb-5 w-50 exam-design">
                <div className="row me-1">
                  <div className="card card-hover-effect">
                    <div className="card-body">
                      <div className="text-start fs-5 lead">
                        <p className="card-title p-1">
                          <i className="pe-2 mr-2 bi bi-book"></i>Subject:{" "}
                          {exam.subjectName}
                        </p>
                        <p className="card-title p-1">
                          <i className="pe-2 mr-2 bi bi-envelope-at-fill"></i>
                          Email: {exam.email}
                        </p>

                        <h6 className="card-title p-1">
                          <i className="pe-2 mr-2 bi bi-card-list"></i>Notes:
                        </h6>
                      </div>
                      <ul className="list-group">
                        {exam.notes.map((note, noteIndex) => (
                          <li key={noteIndex} className="list-group-item">
                            {note}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 text-center">
                        {examActionButtons.map((button, index) => (
                          <Fragment key={index}>
                            {" "}
                            <Button
                              buttonText={button.buttonText}
                              className={button.className}
                              onClick={() => button.onClick(exam._id)}
                            />
                          </Fragment>
                        ))}
                        <DialogBox
                          title={"Delete Exam!!"}
                          body={"Woohoo, Are you sure you want to delete !"}
                          show={show}
                          handleClose={handleClose}
                          action={() => handleDeleteExam(exam._id)}
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
