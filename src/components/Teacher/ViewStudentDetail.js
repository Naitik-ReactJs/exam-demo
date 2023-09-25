import { useEffect, useState } from "react";

import Loader from "../../reusable/Loader";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { fetchStudentDetails } from "../../redux/teacher/actions/StudentDetails";
import { useDispatch, useSelector } from "react-redux";
const ViewStudentDetail = () => {
  const [loading, setLoading] = useState(true);

  const location = new URLSearchParams(useLocation().search);
  const id = location.get("id");
  const tableHeading = [
    "Name",
    "Email",
    "Subject",
    "Score",
    "Rank",
    "Result status",
  ];
  const dispatch = useDispatch();
  const studentDetail = useSelector((state) => state.teacher.studentDetails);
  useEffect(() => {
    dispatch(fetchStudentDetails(setLoading, id));
  }, []);
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container">
      {studentDetail.length === 0 ? (
        <Loader />
      ) : (
        <div className="container">
          <h1 className="my-4">Student Results</h1>
          <div className="table-responsive-md">
            <table className="table table-bordered table-hover p-2">
              <thead className="thead-dark">
                <tr>
                  {tableHeading.map((heading, index) => (
                    <th scope="col" key={index}>
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {studentDetail[0].Result[0] === undefined ? (
                  <tr>
                    <td
                      className="text-center fw-bold fs-2"
                      colSpan={tableHeading.length}
                    >
                      No result found , Please try to give an exam first
                    </td>
                  </tr>
                ) : (
                  studentDetail.map((student) =>
                    student.Result.map((result) => (
                      <tr key={result._id}>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{result.subjectName}</td>
                        <td>{result.score}</td>
                        <td>{result.rank}</td>
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
      <ToastContainer autoClose={2000} theme="colored" />
    </div>
  );
};
export default ViewStudentDetail;
