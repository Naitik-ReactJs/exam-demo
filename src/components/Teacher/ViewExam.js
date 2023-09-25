import { Fragment, useEffect, useState } from "react";

import Loader from "../../reusable/Loader";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import { fetchExamData } from "../../redux/teacher/actions/ExamDetail";
import { useDispatch, useSelector } from "react-redux";
const ViewExam = () => {
  const token = JSON.parse(sessionStorage.getItem("user-info"))?.token;
  const [loading, setLoading] = useState(true);
  const location = new URLSearchParams(useLocation().search);
  const id = location.get("id");
  const dispatch = useDispatch();
  const tableData = useSelector(
    (state) => state.teacher.examContainer?.questions
  );
  const tableHeaders = [
    {
      label: "Question",
      name: "question",
    },
    {
      label: "Options",
      name: "options",
    },
    {
      label: "Correct Answer",
      name: "answer",
    },
  ];

  useEffect(() => {
    dispatch(fetchExamData(setLoading, id, token));
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="container p-3 ">
      <div className="row">
        <div className="col-lg-10">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                {tableHeaders.map((header, index) => (
                  <th key={index}> {header.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData &&
                tableData.map((tableData, index) => (
                  <tr key={index}>
                    {tableHeaders.map((header, index) => (
                      <td key={index}>
                        {Array.isArray(tableData[header?.name]) ? (
                          <Fragment key={index}>
                            {" "}
                            <ul className="list-group">
                              {tableData[header?.name].map(
                                (option, optionIndex) => (
                                  <li
                                    className="list-group-item"
                                    key={optionIndex}
                                  >
                                    {option}
                                  </li>
                                )
                              )}
                            </ul>
                          </Fragment>
                        ) : (
                          <>
                            <td key={index}> {tableData[header?.name]}</td>
                          </>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer autoClose={2000} theme="colored" />
    </div>
  );
};
export default ViewExam;
