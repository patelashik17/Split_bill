const initialState = {
  friendList: [],
  loading: false,
  userBalances: [],
  whoPaidWho: [],
};

const CheckLandingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FRIEND_LIST":
      return {
        ...state,
        friendList: action.payload,
      };
    case "SET_USER_BALANCES":
      return {
        ...state,
        userBalances: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_WHO_PAID_WHO":
      return {
        ...state,
        whoPaidWho: action.payload,
      };
    default:
      return state;
  }
};

export default CheckLandingReducer;
