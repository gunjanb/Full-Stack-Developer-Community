import { createStore } from "redux";

import allReducer from "./reducers";

// const store = createStore(allReducer);
const store = createStore(
  allReducer,
  {
    stripe: {
      products: [],
      cart: [],
      cartOpen: false,
    },
  }
);

export default store;
