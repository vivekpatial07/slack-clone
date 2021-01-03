import * as actionTypes from "./actionTypes";
// User actionCreators

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

// Channel actionCreators

// export const setChannel = (channel) => {
//   return {
//     type: actionTypes.SET_CHANNEL,
//     payload:{
//       channel:
//     }
//   };
// };
