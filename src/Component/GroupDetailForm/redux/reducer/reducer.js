const initialState = {
  group: [],
  name: "",
  list: [],
  error: false,
  groupNameError: false,
  loading: false,
  redirecting: false,
  errorMessage: "",
  groupNameErrorMessage: "",
};

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_FRIEND":
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case "REMOVE_FRIEND":
      return {
        ...state,
        list: state.list.filter((friend) => friend.friendId !== action.payload),
      };
    case "SET_ERROR":
      return {
        ...state,
        error: true,
        errorMessage: action.payload,
      };
    case "SET_ERROR_MESSAGE":
      return {
        ...state,
        groupNameError: true,
        groupNameErrorMessage: action.payload,
      };
    case "HANDLE_ERROR":
      return {
        ...state,
        error: false,
      };
    case "HANDLE_ERROR_MESSAGE":
      return {
        ...state,
        groupNameError: false,
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_REDIRECTING":
      return {
        ...state,
        redirecting: action.payload,
      };
    default:
      return state;
  }
};

export default groupReducer;
