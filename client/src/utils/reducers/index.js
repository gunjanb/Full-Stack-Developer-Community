import { combineReducers } from "redux";
import userReducer from "./userReducer";

const allReducer = combineReducers({
  users: userReducer,
});

export default allReducer;
