import { useEffect, useState } from "react";
import apiAction from "../../api/apiAction";
import Loader from "../../reusable/Loader";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../../reusable/Button";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const ViewStudents = () => {
  const navigate = useNavigate();
  const [studentList, setStudentList] = useState([]);

  const [loading, setLoading] = useState(false);
  const fetchStudentData = async () => {
    const response = await apiAction({
      method: "get",
      url: "dashboard/Teachers/StudentForExam",
      setLoading,
    });

    setStudentList(response.data);
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
    <>
      <div className="container mt-4 text-center">
        <div className="row">
          {studentList.map((item, index) => (
            <div key={index} className=" col-lg-5 mb-5 w-50 exam-design">
              <div className="row me-1">
                <div className="card card-hover-effect">
                  <div className="card-body">
                    <div className="text-start fs-5 lead">
                      <p className="card-title p-1">
                        <i className="pe-2 mr-2 bi bi-person-circle"></i>
                        {item.name}
                      </p>
                      <p className="card-title p-1">
                        <i className="pe-2 mr-2 bi bi-envelope-at-fill"></i>
                        {item.email}
                      </p>

                      <p className="card-title p-1">
                        <i className="pe-2 mr-2 bi bi-toggle-on"></i>
                        Status: {item.status}
                      </p>
                    </div>
                    <div className="mt-4 text-center">
                      {" "}
                      <Button
                        buttonText={"View result"}
                        type="submit"
                        className={"btn btn-dark  m-auto mb-2"}
                        onClick={() => handleViewResultClick(item._id)}
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

export default ViewStudents;
