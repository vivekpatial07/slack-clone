import * as actionTypes from "../actions/actionTypes";
import { combineReducers } from "redux";
const initalState = {
  isLoading: true,
  currentUser: null,
};
const userReducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        isLoading: false,
        currentUser: action.payload.currentUser,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
});
export default rootReducer;
