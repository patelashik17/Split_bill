export const SET_ERROR = "SET_ERROR";
export const SET_CHILD_LIST = "SET_CHILD_LIST";
export const SET_INPUT_AMOUNT = "SET_INPUT_AMOUNT";
export const SET_INPUT_TITLE = "SET_INPUT_TITLE";
export const SET_IS_SUCCESS = "SET_IS_SUCCESS";
export const SET_SELECTED_OPTION = "SET_SELECTED_OPTION";

export const setError = (error) => {
  return {
    type: SET_ERROR,
    payload: error,
  };
};

export const setChildList = (childList) => {
  return {
    type: SET_CHILD_LIST,
    payload: childList,
  };
};

export const setInputAmount = (amount) => {
  return {
    type: SET_INPUT_AMOUNT,
    payload: amount,
  };
};

export const setInputTitle = (title) => {
  return {
    type: SET_INPUT_TITLE,
    payload: title,
  };
};

export const setIsSuccess = (isSuccess) => {
  return {
    type: SET_IS_SUCCESS,
    payload: isSuccess,
  };
};

export const setSelectedOption = (option) => {
  return {
    type: SET_SELECTED_OPTION,
    payload: option,
  };
};
