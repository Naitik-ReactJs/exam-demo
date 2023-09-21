import { INCREMENT_INDEX } from "../constants";
export const questionIndexIncrement = () => {
  return async (dispatch, value) => {
    dispatch({
      type: INCREMENT_INDEX,
      payload: value,
    });
  };
};
