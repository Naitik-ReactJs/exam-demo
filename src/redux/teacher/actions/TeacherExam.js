import apiAction from "../../api/apiAction";
const fetchTeacherExam = (setLoading) => {
  return async (dispatch, getState) => {
    const response = await apiAction({
      method: "get",
      url: "dashboard/Teachers/viewExam",
      setLoading,
    });

    dispatch({
      type: "FETCH_TEACHER_EXAMS",
      payload: response.data,
    });
  };
};
export default fetchTeacherExam;
