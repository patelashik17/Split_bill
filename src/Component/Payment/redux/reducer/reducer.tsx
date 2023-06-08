import {
  SET_ERROR,
  SET_CHILD_LIST,
  SET_INPUT_AMOUNT,
  SET_INPUT_TITLE,
  SET_IS_SUCCESS,
  SET_SELECTED_OPTION,
} from "../action/action";

interface paymentState{
  error: boolean;
  childList: any;
  selectedOption: any;
  inputAmount: string;
  inputTitle: string;
  isSuccess: boolean;
}

const initialState:paymentState = {
  error: false,
  childList: [],
  selectedOption: "",
  inputAmount: "",
  inputTitle: "",
  isSuccess: false,
};

const paymentReducer = (state = initialState, action:{type:string; payload:any}) => {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_CHILD_LIST:
      return {
        ...state,
        childList: action.payload,
      };
    case SET_INPUT_AMOUNT:
      return {
        ...state,
        inputAmount: action.payload,
      };
    case SET_INPUT_TITLE:
      return {
        ...state,
        inputTitle: action.payload,
      };
    case SET_IS_SUCCESS:
      return {
        ...state,
        isSuccess: action.payload,
      };
    case SET_SELECTED_OPTION:
      return {
        ...state,
        selectedOption: action.payload,
      };
    default:
      return state;
  }
};

export default paymentReducer;
