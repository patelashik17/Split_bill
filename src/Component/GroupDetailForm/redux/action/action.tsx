export const addFriend = (friendData: { friendId: string; task: string }) => {
  return {
    type: "ADD_FRIEND",
    payload: friendData,
  };
}; 

export const removeFriend = (friendId: number) => {
  return {
    type: "REMOVE_FRIEND",
    payload: friendId,
  };
};
  