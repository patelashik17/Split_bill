export const setFriendList = (friendList) => {
  return {
    type: "SET_FRIEND_LIST",
    payload: friendList,
  };
};

export const setUserBalances = (userBalances) => {
  return {
    type: "SET_USER_BALANCES",
    payload: userBalances,
  };
};

export const setLoading = (loading) => {
  return {
    type: "SET_LOADING",
    payload: loading,
  };
};

export const setWhoPaidWho = (whoPaidWho) => {
  return {
    type: "SET_WHO_PAID_WHO",
    payload: whoPaidWho,
  };
};
