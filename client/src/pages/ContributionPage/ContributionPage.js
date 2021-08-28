import React from "react";
import ProductList from "../../components/ProductList";
import Cart from "../../components/Cart";
import './contribution.css';

const ContributionPage = () => {
  return (
    <div className="padding padding-bottom">
      <Cart />
      <ProductList />
    </div>
  );
};

export default ContributionPage;