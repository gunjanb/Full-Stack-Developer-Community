import { combineReducers } from "redux";
import userReducer from "./userReducer";
import techReducer from "./techReducer";
import { stripeReducer } from "./reducers";
import updatecurtechReducer from "./updatecurtechReducer";

const allReducer = combineReducers({
  users: userReducer,
  techs: techReducer,
  stripe: stripeReducer,
  currentTech: updatecurtechReducer,
});

export default allReducer;
