import { UPDATE_USERS } from "../actions";

const userReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_USERS:
      // return array
      return {
        ...action.payload,
      };

    // POSSIBLY CREATE NEW ACTION TO HANDLE UPDATE OF INDIVIDUAL CREATOR PROPERTIES

    default:
      return state;
  }
};

export default userReducer;
