import React, { useEffect } from 'react';
import ProductItem from '../ProductItem';
// import { useStoreContext } from '../../utils/GlobalState';
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helper';
import spinner from '../../assets/spinner.gif';

function ProductList() {
  // const [state, dispatch] = useStoreContext();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.stripe);

  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);
  console.log('data:\n', JSON.stringify(data, null, 2));

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    return state.products;
  }

  return (
    <div className="my-2">
      <h2>Select a contribution amount</h2>
      {state.products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't selected a contribution!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
