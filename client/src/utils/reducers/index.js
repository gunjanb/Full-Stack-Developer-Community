import { combineReducers } from "redux";
// import userReducer from "./userReducer";
// import techReducer from "./techReducer";
import { stripeReducer } from "./reducers";

const allReducer = combineReducers({
  users: userReducer,
  techs: techReducer,
  stripe: stripeReducer,
});

export default allReducer;
