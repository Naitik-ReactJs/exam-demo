import { Fragment, useEffect, useState } from "react";

import Loader from "../../reusable/Loader";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { fetchStudentDetails } from "../../redux/teacher/actions/StudentDetails";
import { useDispatch, useSelector } from "react-redux";
import { SEO } from "../../Helmet";
const ViewStudentDetail = () => {
  const [loading, setLoading] = useState(true);

  const location = new URLSearchParams(useLocation().search);
  const title = "Student Results";
  const id = location.get("id");

  const studentInfo = [
    {
      label: "Name",
      name: "name",
    },
    {
      label: "E-mail",
      name: "email",
    },
  ];
  const tableHeading = [
    {
      label: "Subject",
      name: "subjectName",
    },
    {
      label: "Score",
      name: "score",
    },
    {
      label: "Rank",
      name: "rank",
    },
    {
      label: "Result status",
      name: "resultStatus",
    },
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
      <SEO title="Student results" />
      {studentDetail.length === 0 ? (
        <Loader />
      ) : (
        <div className="container">
          <h1 className="my-4">{title}</h1>
          <div className="table-responsive-md">
            {studentDetail.map((item, index) => {
              return (
                <Fragment key={index}>
                  <ul className="list-group mb-4">
                    {studentInfo.map((data, index) => {
                      return (
                        <li className="list-group-item" key={index}>
                          <span className="fw-bold"> {data.label}</span>:{" "}
                          {item[data.name]}
                        </li>
                      );
                    })}
                  </ul>
                </Fragment>
              );
            })}
            <table className="table table-bordered table-hover p-2">
              <thead className="thead-dark">
                <tr>
                  {tableHeading.map((heading, index) => (
                    <th scope="col" key={index}>
                      {heading.label}
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
                        {tableHeading.map((heading, index) => {
                          return <td key={index}>{result[heading.name]}</td>;
                        })}
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
