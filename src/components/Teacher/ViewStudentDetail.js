import React, { useEffect, useState } from "react";
import apiAction from "../../api/apiAction";
import Loader from "../../reusable/Loader";
import { useLocation } from "react-router-dom";

const ViewStudentDetail = () => {
  const [loading, setLoading] = useState(false);
  const [studentDetail, setStudentDetail] = useState([]);
  const location = new URLSearchParams(useLocation().search);
  const id = location.get("id");
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

  return (
    <div className="container py-5 ms-5">
      {studentDetail.length === 0 ? (
        <Loader />
      ) : (
        <div>
          <h1 className="my-4">Student Results</h1>
          <div className="table-responsive">
            <table className="table table-bordered table-hover p-2">
              <thead className="thead-dark">
                <tr>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Rank</th>
                  <th>Score</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {studentDetail[0].Result[0] === undefined ? (
                  <tr>
                    <td className="text-center fs-1" colSpan={5}>
                      No result found , please try again
                    </td>
                  </tr>
                ) : (
                  studentDetail.map((student) =>
                    student.Result.map((result) => (
                      <tr key={result._id}>
                        <td>{student.email}</td>
                        <td>{result.subjectName}</td>
                        <td>{result.rank}</td>
                        <td>{result.score}</td>
                        <td>{result.resultStatus}</td>
                      </tr>
                    ))
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
export default ViewStudentDetail;
