export const questionIndexDecrement = () => {
  return async (dispatch, value) => {
    dispatch({
      type: "DECREMENT_INDEX",
      payload: value,
    });
  };
};
export const questionIndexIncrement = () => {
  return async (dispatch, value) => {
    dispatch({
      type: "INCREMENT_INDEX",
      payload: value,
    });
  };
};
