import React from "react";
import ProductList from "../../components/ProductList";
import Cart from "../../components/Cart";
import Container from 'react-bootstrap/Container';
import './index.css';

const ContributionPage = () => {
  return (
    <Container>
      <div className="container">
        <ProductList />
        <Cart />
      </div>
    </Container>
  );
};

export default ContributionPage;