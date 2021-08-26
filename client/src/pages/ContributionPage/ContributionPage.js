import React from "react";
import ProductList from "../../components/ProductList";
import Cart from "../../components/Cart";
import Container from 'react-bootstrap/Container';
import './index.css';

const ContributionPage = () => {
  return (
    <div className="container">
      <ProductList />
      <Cart />
    </div>
  );
};

export default ContributionPage;