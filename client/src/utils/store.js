import { createStore } from "redux";

import allReducer from "./reducers";

const store = createStore(
  allReducer,
  {
    ...(window.REDUX_DEVTOOLS_EXTENSION && window.REDUX_DEVTOOLS_EXTENSION()),
    stripe: {
      products: [],
      cart: [],
      cartOpen: false,
    },
  }
);

export default store;
