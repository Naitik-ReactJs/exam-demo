import React, { useEffect, useState } from "react";
import apiAction from "../../api/apiAction";
import Loader from "../../reusable/Loader";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const ViewExam = () => {
  const token = JSON.parse(sessionStorage.getItem("user-info"))?.token;
  const [loading, setLoading] = useState(true);
  const location = new URLSearchParams(useLocation().search);
  const id = location.get("id");

  const [tableData, setTableData] = useState([]);
  const tableHeaders = ["Sr. no", "Question", "Options", "Correct Answer"];

  const fetchExamDetail = async () => {
    try {
      const response = await apiAction({
        method: "get",
        url: "dashboard/Teachers/examDetail",
        setLoading,
        token,
        id,
      });
      setTableData(response.data.questions);
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    fetchExamDetail();
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
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData &&
                tableData.map((question, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{question.question}</td>
                    <td>
                      <ul className="list-group">
                        {question.options.map((option, optionIndex) => (
                          <li className="list-group-item" key={optionIndex}>
                            {option}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>{question.answer}</td>
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
