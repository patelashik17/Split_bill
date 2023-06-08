export const SET_ERROR = "SET_ERROR";
export const SET_CHILD_LIST = "SET_CHILD_LIST";
export const SET_INPUT_AMOUNT = "SET_INPUT_AMOUNT";
export const SET_INPUT_TITLE = "SET_INPUT_TITLE";
export const SET_IS_SUCCESS = "SET_IS_SUCCESS";
export const SET_SELECTED_OPTION = "SET_SELECTED_OPTION";

export const setError = (error:boolean) => {
  return {
    type: SET_ERROR,
    payload: error,
  };
};

export const setChildList = (childList:any) => {
  return {
    type: SET_CHILD_LIST,
    payload: childList,
  };
};

export const setInputAmount = (amount:string) => {
  return {
    type: SET_INPUT_AMOUNT,
    payload: amount,
  };
};

export const setInputTitle = (title:string) => {
  return {
    type: SET_INPUT_TITLE,
    payload: title,
  };
};

export const setIsSuccess = (isSuccess:boolean) => {
  return {
    type: SET_IS_SUCCESS,
    payload: isSuccess,
  };
};

export const setSelectedOption = (option:any) => {
  return {
    type: SET_SELECTED_OPTION,
    payload: option,
  };
};
