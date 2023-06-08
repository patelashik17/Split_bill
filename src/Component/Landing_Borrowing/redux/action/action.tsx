export const setFriendList = (friendList:any) => {
  return {
    type: "SET_FRIEND_LIST",
    payload: friendList,
  };
};

export const setUserBalances = (userBalances:any) => {
  return {
    type: "SET_USER_BALANCES",
    payload: userBalances,
  };
};

export const setLoading = (loading:boolean) => {
  return {
    type: "SET_LOADING",
    payload: loading,
  };
};

export const setWhoPaidWho = (whoPaidWho:any) => {
  return {
    type: "SET_WHO_PAID_WHO",
    payload: whoPaidWho,
  };
};
