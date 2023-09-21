import apiAction from "../../../api/apiAction";
export const fetchStudentsData = (setLoading) => {
  return async (dispatch) => {
    const response = await apiAction({
      method: "get",
      url: "dashboard/Teachers/StudentForExam",
      setLoading,
    });

    dispatch({
      type: "FETCH_STUDENTS_LIST",
      payload: response.data,
    });
  };
};
