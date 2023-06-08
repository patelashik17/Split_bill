import { SET_ERROR, SET_LOADING, SET_USERS } from "../action/action";

interface HistoryState{
  users:{},
  error:boolean,
  loading:boolean,
}

const initialState:HistoryState = {
  users: {},
  error: false,
  loading: false,
};

const HistoryReducer = (state = initialState, action:{type:string; payload:any}) => {
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
