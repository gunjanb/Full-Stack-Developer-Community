import { UPDATE_CURRENT_TECH } from "../actions";

const updatecurtechReducer = (state = "", action) => {
  switch (action.type) {
    case UPDATE_CURRENT_TECH:
      return action.payload;

    default:
      return state;
  }
};

export default updatecurtechReducer;
