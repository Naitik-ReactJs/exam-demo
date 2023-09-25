import apiAction from "../../../api/apiAction";
import { FETCH_TEACHER_EXAMS } from "../constants";
const fetchTeacherExam = (setLoading) => {
  return async (dispatch, getState) => {
    const response = await apiAction({
      method: "get",
      url: "dashboard/Teachers/viewExam",
      setLoading,
    });

    dispatch({
      type: FETCH_TEACHER_EXAMS,
      payload: response.data,
    });
  };
};
export default fetchTeacherExam;
