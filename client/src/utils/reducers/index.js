import { combineReducers } from "redux";
import userReducer from "./userReducer";
import techReducer from "./techReducer";

const allReducer = combineReducers({
  users: userReducer,
  techs: techReducer,
});

export default allReducer;
