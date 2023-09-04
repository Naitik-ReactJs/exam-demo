import React, { useEffect, useState } from "react";
import apiAction from "../../api/apiAction";
import Loader from "../../reusable/Loader";
import { Card } from "react-bootstrap";

const ViewStudentDetail = () => {
  const [loading, setLoading] = useState(false);
  const [studentDetail, setStudentDetail] = useState([]);

  let id = localStorage.getItem("student-id");
  useEffect(() => {
    const showResult = async () => {
      try {
        const response = await apiAction({
          method: "get",
          url: "dashboard/Teachers/viewStudentDetail",
          token: JSON.parse(localStorage.getItem("user-info"))?.token,
          setLoading,
          id,
        });
        setStudentDetail(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    showResult();
  }, [id]);
  if (loading) {
    return <Loader />;
  }
  // console.log(studentDetail[0].Result.map((item) => Object.keys(item)));
  // console.log(studentDetail[0].Result.map((item) => Object.values(item)));
  return (
    <div className="container py-5 ms-5">
      {studentDetail.length === 0 ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="row d-flex justify-content-space-around">
            <div className="col custom-display">
              <Card className="card">
                <Card.Body>
                  <Card.Title className="pb-2">
                    <i className="pe-2 mr-2 bi bi-person-circle"></i>
                  </Card.Title>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ViewStudentDetail;
