import { FETCH_EXAM_DATA } from "../constants";
import apiAction from "../../../api/apiAction";
export const fetchExamData = (setLoading, id, token) => {
  return async (dispatch, getState) => {
    const response = await apiAction({
      method: "get",
      url: "dashboard/Teachers/examDetail",
      setLoading,
      token,
      id,
    });
    dispatch({
      type: FETCH_EXAM_DATA,
      payload: response.data,
    });
  };
};
