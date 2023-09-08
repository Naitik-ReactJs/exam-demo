import React, { useEffect, useState } from "react";
import apiAction from "../../api/apiAction";
import Loader from "../../reusable/Loader";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../reusable/Button";
import { useLocation } from "react-router-dom";
const ViewExam = () => {
  const [loading, setLoading] = useState(true);
  const location = new URLSearchParams(useLocation().search);
  const id = location.get("id");

  const token = JSON.parse(localStorage.getItem("user-info"))?.token;
  const [tableData, setTableData] = useState([]);
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
    <div>
      {tableData && tableData.map((item) => item)}
      <pre> {JSON.stringify(tableData, null, 1)}</pre>
      <ToastContainer autoClose={2000} theme="colored" />
    </div>
  );
};
export default ViewExam;
