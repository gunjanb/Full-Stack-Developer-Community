import { UPDATE_TECHS } from "../actions";

const techReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_TECHS:
      return {
        ...action.payload,
      };

    default:
      return state;
  }
};

export default techReducer;
