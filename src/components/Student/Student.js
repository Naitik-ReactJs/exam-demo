import React, { useEffect, useState } from "react";
import apiAction from "../../api/apiAction";
import Loader from "../../reusable/Loader";
import Button from "../../reusable/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const Student = () => {
  const totalExamQuestion = 7;
  const token = JSON.parse(sessionStorage.getItem("user-info"))?.token;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const fetchAllExams = async () => {
    try {
      const response = await apiAction({
        method: "get",
        url: "student/studentExam",
        token: token,
        setLoading,
      });
      setData(response.data);
    } catch (error) {
      toast.error("Error fetching data:");
    }
  };
  useEffect(() => {
    fetchAllExams();
  }, []);
  if (loading) {
    return <Loader />;
  }
  const handleGiveExamClick = async (id) => {
    navigate(`exam?id=${id}`);
  };

  return (
    <>
      <div className="container mt-4 text-center">
        <div className="row">
          {data &&
            data.map((item, index) => (
              <div key={index} className=" col-lg-6 mb-5 w-50 exam-design">
                <div className="row me-1">
                  <div className="card card-hover-effect">
                    <div className="card-body">
                      <div className="text-start fs-5 lead">
                        <h5 className="card-text">
                          Subject :{item.subjectName}
                        </h5>
                        <p className="card-text">Email: {item.email}</p>

                        <p>Notes:</p>

                        <ul className="list-group">
                          {item.notes.map((note, noteIndex) => (
                            <li key={noteIndex} className="list-group-item">
                              {note}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="text-center mt-3">
                        {item.Result.length > 0 ? (
                          <div>
                            {item.Result.map((resultData, resultIndex) => (
                              <div key={resultIndex}>
                                <h6>Result: {resultData.resultStatus}</h6>
                                <p>Rank: {resultData.rank}</p>
                                <p>
                                  Score:{" "}
                                  {Math.round(
                                    (resultData.score * 100) / totalExamQuestion
                                  )}
                                  %
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <h6>Result: Exam Pending</h6>
                        )}
                        {item.Result.length !== 0 ? (
                          <></>
                        ) : (
                          <Button
                            disabled={item.Result.length !== 0}
                            className="btn btn-success"
                            buttonText="Give Exam"
                            onClick={() => handleGiveExamClick(item._id)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <ToastContainer autoClose={2000} theme="colored" />
      </div>
    </>
  );
};

export default Student;
