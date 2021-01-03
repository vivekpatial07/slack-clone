import * as actionTypes from "./actionTypes";
export const setUser = (user) => {
  return {
    type: actionTypes.SET_USER,
    payload: {
      currentUser: user,
    },
  };
};
export const removeUser = () => {
  return {
    type: actionTypes.REMOVE_USER,
  };
};