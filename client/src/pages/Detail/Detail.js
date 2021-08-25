import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_CONTRIBUTIONS,
} from '../../utils/actions/index';
import { QUERY_ALL_CONTRIBUTIONS } from '../../utils/queries';
import { idbPromise } from '../../utils/helper';
import spinner from '../assets/spinner.gif';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentContribution, setCurrentContribution] = useState({});

  const { loading, data } = useQuery(QUERY_ALL_CONTRIBUTIONS);

  const { contributions, cart } = state;

  useEffect(() => {
    // already in global store
    if (contributions.length) {
      setCurrentContribution(contributions.find((contribution) => contribution._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_CONTRIBUTIONS,
        contributions: data.contributions,
      });

      data.contributions.forEach((contribution) => {
        idbPromise('contributions', 'put', contribution);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('contributions', 'get').then((indexedContributions) => {
        dispatch({
          type: UPDATE_CONTRIBUTIONS,
          products: indexedContributions,
        });
      });
    }
  }, [contributions, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        contribution: { ...currentContribution, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentContribution, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentContribution._id,
    });

    idbPromise('cart', 'delete', { ...currentContribution });
  };

  return (
    <>
      {currentContribution && cart ? (
        <div className="container my-1">
          <Link to="/">← Back to Contributions</Link>

          <h2>{currentContribution.name}</h2>

          <p>{currentContribution.description}</p>

          <p>
            <strong>Price:</strong>${currentContribution.price}{' '}
            <button onClick={addToCart}>Add to Cart</button>
            <button
              disabled={!cart.find((p) => p._id === currentContribution._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentContribution.image}`}
            alt={currentContribution.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;