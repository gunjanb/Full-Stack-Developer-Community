import React from "react";
import ContributionList from "../components/ContributionList";
import Cart from "../components/Cart";

const ContributionPage = () => {
  return (
    <div className="container">
      <ContributionList />
      <Cart />
    </div>
  );
};

export default ContributionPage;