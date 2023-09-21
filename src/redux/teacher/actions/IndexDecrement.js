import { DECREMENT_INDEX } from "../constants";
export const questionIndexDecrement = () => {
  return async (dispatch, value) => {
    dispatch({
      type: DECREMENT_INDEX,
      payload: value,
    });
  };
};
