import React from "react";
import ProductList from "../../components/ProductList";
import Cart from "../../components/Cart";

const ContributionPage = () => {
  return (
    <div className="container">
      <ProductList />
      <Cart />
    </div>
  );
};

export default ContributionPage;