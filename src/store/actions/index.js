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

export const setChannel = (channel) => {
  return {
    type: actionTypes.SET_CHANNEL,
    payload: {
      currentChannel: channel,
    },
  };
};
export const setPrivateChannel = (isPrivate) => {
  return {
    type: actionTypes.SET_PRIVATE_CHANNEL,
    payload: {
      isPrivate,
    },
  };
};
export const starChannel = (isStarred) => {
  return {
    type: actionTypes.STAR_CHANNEL,
    payload: {
      isStarred,
    },
  };
};
//for side panel
export const showPanel = () => {
  return {
    type: actionTypes.SHOW_PANEL,
  };
};
