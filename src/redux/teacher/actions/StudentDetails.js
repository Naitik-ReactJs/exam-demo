import apiAction from "../../../api/apiAction";
import { FETCH_STUDENT_DETAILS } from "../constants";
export const fetchStudentDetails = (setLoading, id) => {
  return async (dispatch, getState) => {
    const response = await apiAction({
      method: "get",
      url: "dashboard/Teachers/viewStudentDetail",
      setLoading,
      id,
    });

    dispatch({
      type: FETCH_STUDENT_DETAILS,
      payload: response.data,
    });
  };
};
