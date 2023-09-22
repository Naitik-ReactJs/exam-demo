import apiAction from "../../../api/apiAction";
import { FETCH_PROFILE } from "../constants";
export const setIsNameModified = (editStatus) => ({
  type: "SET_NAME_MODIFIED",
  payload: editStatus,
});
export const setProfileName = (name) => ({
  type: "SET_PROFILE_NAME",
  payload: name,
});
const fetchProfile = (setLoading, id) => {
  return async (dispatch, getState) => {
    const response = await apiAction({
      method: "get",
      url: "student/getStudentDetail",
      setLoading,
    });

    dispatch({
      type: FETCH_PROFILE,
      payload: response.data,
    });
  };
};
export default fetchProfile;
