import {
  UPDATE_CONTRIBUTIONS,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  CLEAR_CART,
  TOGGLE_CART
} from "./actions";

const stripeReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_CONTRIBUTIONS:
      return {
        ...state,
        contributions: [...action.contributions],
      };

    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.contribution],
      };

    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.contributions],
      };

    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map(contribution => {
          if (action._id === contribution._id) {
            contribution.purchaseQuantity = action.purchaseQuantity
          }
          return contribution;
        })
      };

    case REMOVE_FROM_CART:
      let newState = state.cart.filter(contribution => {
        return contribution._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState
      };

    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: []
      };

    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen
      };

    default:
      return state;
  }
};

export default stripeReducer;