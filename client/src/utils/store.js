import { createStore } from "redux";

import allReducer from "./reducers";

// const store = createStore(allReducer);
const store = createStore(
  allReducer,
  {
    ...(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    stripe: {
      products: [],
      cart: [],
      cartOpen: false,
    },
  }
);

export default store;
