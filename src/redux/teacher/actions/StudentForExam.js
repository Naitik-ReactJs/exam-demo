import apiAction from "../../../api/apiAction";
import { FETCH_STUDENTS_LIST } from "../constants";
export const fetchStudentsData = (setLoading) => {
  return async (dispatch, getState) => {
    const response = await apiAction({
      method: "get",
      url: "dashboard/Teachers/StudentForExam",
      setLoading,
    });

    dispatch({
      type: FETCH_STUDENTS_LIST,
      payload: response.data,
    });
  };
};
