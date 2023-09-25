export const questionIndexDecrement = (value) => {
  return async (dispatch) => {
    dispatch({
      type: "DECREMENT_INDEX",
      payload: value - 1,
    });
  };
};
export const questionIndexIncrement = (value) => {
  return async (dispatch) => {
    dispatch({
      type: "INCREMENT_INDEX",
      payload: value + 1,
    });
  };
};
