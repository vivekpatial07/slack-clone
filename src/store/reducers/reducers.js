import * as actionTypes from "../actions/actionTypes";
import { combineReducers } from "redux";
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
const initialChannelState = {
  currentChannel: null,
};
const channelReducer = (state = initialChannelState, action) => {
  switch (action.type) {
    case actionTypes.SET_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload.currentChannel,
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
