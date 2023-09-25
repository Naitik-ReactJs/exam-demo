import apiAction from "../../../api/apiAction";
import { FETCH_ALL_EXAMS } from "../constants";
const token = JSON.parse(sessionStorage.getItem("user-info"))?.token;
const fetchAllExams = (setLoading) => {
  return async (dispatch, getState) => {
    const response = await apiAction({
      method: "get",
      url: "student/studentExam",
      token: token,

      setLoading,
    });

    dispatch({
      type: FETCH_ALL_EXAMS,
      payload: response.data,
    });
  };
};
export default fetchAllExams;
