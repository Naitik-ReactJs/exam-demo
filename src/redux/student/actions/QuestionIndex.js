import { QUESTION_INDEX } from "../constants";
const fetchAllExams = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: QUESTION_INDEX,
      payload: value,
    });
  };
};
export default fetchAllExams;
