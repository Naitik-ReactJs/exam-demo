import React, { useEffect, useState } from "react";
import apiAction from "../../api/apiAction";
import Loader from "../../reusable/Loader";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
const ViewExam = () => {
  const [loading, setLoading] = useState(true);
  const location = new URLSearchParams(useLocation().search);
  const id = location.get("id");
  const tableHeading = ["Sr no", "Questions", "Answer", "Options"];
  const token = JSON.parse(localStorage.getItem("user-info"))?.token;
  const [examData, setExamData] = useState([]);
  const [examsDetail, setExamsDetail] = useState([]);
  const fetchExamData = async () => {
    try {
      const response = await apiAction({
        method: "get",
        url: "dashboard/Teachers/viewExam",
        token: token,
        setLoading,
      });

      setExamsDetail(response.data);
    } catch (error) {
      toast.error("Error fetching data:");
    }
  };
  useEffect(() => {
    fetchExamData();
  }, []);

  const subjectName = examsDetail
    .filter((item) => item._id === id)
    .map((item) => item.subjectName);

  const fetchExamDetail = async () => {
    try {
      const response = await apiAction({
        method: "get",
        url: "dashboard/Teachers/examDetail",
        setLoading,
        token,
        id,
      });
      setExamData(response.data.questions);
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
    <div>
      <div className="container py-5 ms-5">
        {examData.length === 0 ? (
          <Loader />
        ) : (
          <div>
            <h1 className="my-4">
              Exam details : Subject name - {subjectName}
            </h1>
            <div className="table-responsive">
              <table className="table table-bordered table-hover p-2">
                <thead className="thead-dark ">
                  <tr>
                    {tableHeading.map((heading, index) => (
                      <th className="p-3" key={index}>
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {examData.map((data, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.question}</td>
                      <td>{data.answer}</td>
                      <td>
                        {data.options.map((item, index) => (
                          <ul key={index}>
                            <li>{item}</li>
                          </ul>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <ToastContainer autoClose={2000} theme="colored" />
      </div>
    </div>
  );
};
export default ViewExam;
