import React from "react";
import { Link } from "react-router-dom";
import { pluralize, idbPromise } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import "./productItem.css"

function ProductItem(item) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.stripe);

  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item;

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <div className="flex-box">
    <div className="card px-1 py-1 card-size m-2 card-background-style text-style donate-border">
      <Link to={`/products/${_id}`}>
        <img
          className="image-size rounded img-fluid"
          alt={name}
          src={`/images/${image}`}
        />
        <h2 className="donate-amount">{name}</h2>
      </Link>
      <div className="font-styling">
        <div>{quantity} {pluralize("item", quantity)} available</div>
      </div>
      <button className="cart-add align-self-center rounded" onClick={addToCart}>Add ${price} to cart</button>
    </div>
    </div>
  );
}

export default ProductItem;

