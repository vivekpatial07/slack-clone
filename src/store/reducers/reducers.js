import * as actionTypes from "../actions/actionTypes";
import { combineReducers } from "redux";
//User reducer
const initalUserState = {
  isLoading: true,
  currentUser: null,
};
const userReducer = (state = initalUserState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        isLoading: false,
        currentUser: action.payload.currentUser,
      };
    case actionTypes.REMOVE_USER:
      return {
        ...state,
        currentUser: null,
        isLoading: false,
      };
    default:
      return state;
  }
};
//Channel reducer
const initialChannelState = {
  currentChannel: null,
  isPrivate: false,
  isStarred: false,
};
const channelReducer = (state = initialChannelState, action) => {
  switch (action.type) {
    case actionTypes.SET_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload.currentChannel,
      };
    case actionTypes.SET_PRIVATE_CHANNEL:
      return {
        ...state,
        isPrivate: action.payload.isPrivate,
      };
    case actionTypes.STAR_CHANNEL:
      return {
        ...state,
        isStarred: action.payload.isStarred,
      };
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  user: userReducer,
  channel: channelReducer,
});
export default rootReducer;
