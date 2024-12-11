import React from "react";
import AddDetails from "./AddDetails";
import ProductDetails from "./ProductDetails";

const Dashboard = () => {
  return (
    <>
      <div className="row dashboard">
        <AddDetails/>
        <ProductDetails />
      </div>
    </>
  );
};

export default Dashboard;
