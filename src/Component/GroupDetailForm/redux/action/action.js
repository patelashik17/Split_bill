export const addFriend = (friend) => {
  return {
    type: "ADD_FRIEND",
    payload: friend,
  };
};

export const removeFriend = (friendId) => {
  return {
    type: "REMOVE_FRIEND",
    payload: friendId,
  };
};
