import apiAction from "../../../api/apiAction";
import { FETCH_EXAM_PAPER } from "../constants";
const fetchAllExams = (setLoading, id) => {
  return async (dispatch, getState) => {
    const response = await apiAction({
      method: "get",
      url: "student/examPaper",
      id,
      setLoading,
    });

    dispatch({
      type: FETCH_EXAM_PAPER,
      payload: response.data,
    });
  };
};
export default fetchAllExams;
