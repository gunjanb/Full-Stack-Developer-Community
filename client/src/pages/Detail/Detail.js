import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from "react-redux";
import Cart from '../../components/Cart';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from '../../utils/actions/index';
import { QUERY_ALL_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helper';
import spinner from '../../assets/spinner.gif';
import "./detail.css";
// import "./../Home/debug.css";

function Detail() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.stripe);
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);

  const { products, cart } = state;

  useEffect(() => {
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

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
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });

    idbPromise('cart', 'delete', { ...currentProduct });
  };

  return (
    <>
      {currentProduct && cart ? (
        <div className="container d-flex justify-content-center p-3">
        <div className="detail-container text-style">
          <Link className="link-text" to="/contributionPage">← Back to Contributions</Link>

          <h2 className="detail-title m-0">{currentProduct.name}</h2>

          <p className="detail-text">{currentProduct.description}</p>

          <p className="detail-add">
            <strong>Price: </strong>${currentProduct.price}{' '}
            <button className="detail-button"onClick={addToCart}>Add to Cart</button>
            <button
              className="detail-button"
              disabled={!cart.find((p) => p._id === currentProduct._id)}
              onClick={removeFromCart}
            >
              Remove
            </button>
          </p>

          <img
            className="detail-img img-fluid rounded"
            src={`../images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;