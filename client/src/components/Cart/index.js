import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helper';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import './cart.css';

const stripePromise = loadStripe('pk_test_51JRSIkDCPVMgZ8j7LQXvGtgzf95mU0xYqBOij8hGCmsqUW97YIKnIcsn5iPCSswvapFxsXA9F7IVJw73CFoQIuV000ZgsxrTkm');

const Cart = () => {
  const dispatch = useDispatch();
  const cartFromState = useSelector(state => state.stripe.cart);
  const cartOpen = useSelector(state => state.stripe.cartOpen);
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!cartFromState.length) {
      getCart();
    }
  }, [cartFromState.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    cartFromState.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];

    cartFromState.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }

  if (!cartOpen) {
    return (
      <div className="cart-closed container d-flex justify-content-end" onClick={toggleCart}>
        <span className="cart-size" role="img" aria-label="trash">
          🛒
        </span>
      </div>
    );
  }

  return (
    <div className="cart mb-4">
      <div className="close shopping-font m-2" onClick={toggleCart}>
        [close]
      </div>
      <h2 className="shopping-title mt-2">Shopping Cart</h2>
      {cartFromState.length ? (
        <div>
          {cartFromState.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="total">
            <strong>Total: ${calculateTotal()}</strong>

            {Auth.loggedIn() ? (
              <button className="m-3 checkout rounded"onClick={submitCheckout}>Checkout</button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <h3 className="shopping-font">
          <span role="img" aria-label="shocked">
            😱
          </span>
          You haven't added anything to your cart yet!
        </h3>
      )}
    </div>
  );
};

export default Cart;