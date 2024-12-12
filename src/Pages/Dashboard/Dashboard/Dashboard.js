import React from "react";
import AddDetails from "./AddDetails";
import ProductDetails from "./ProductDetails";
import SalesAnalysis from "./SalesAnalysis";
import StockAvailability from "./StockAvailability";
import ProductSale from "./ProductSale";
import SalesActivity from "./SalesActivity";
import TopSellingItem from "./TopSellingItem";

const Dashboard = () => {
  return (
    <div className="dashboard-padding">
      <div className="row dashboard">
        <AddDetails />
        <ProductDetails />
      </div>
      <div className="row">
        <SalesAnalysis />
        <StockAvailability />
      </div>
      <div className="row">
        <ProductSale />
      </div>
      <div className="row">
        <SalesActivity />
        <TopSellingItem />
      </div>
    </>
  );
};

export default Dashboard;
