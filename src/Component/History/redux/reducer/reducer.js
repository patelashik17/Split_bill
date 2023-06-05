import { SET_ERROR, SET_LOADING, SET_USERS } from "../action/action";

const initialState = {
  users: {},
  error: false,
  loading: false,
};

const HistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case SET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default HistoryReducer;
