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
// const initalChannelState = {

// }

const rootReducer = combineReducers({
  user: userReducer,
});
export default rootReducer;
