import React from "react";
import AddDetails from "./AddDetails";
import ProductDetails from "./ProductDetails";

const Dashboard = () => {
  return (
    <div className="dashboard-padding">
      <div className="row dashboard">
        <AddDetails/>
        <ProductDetails />
      </div>
    </div> 
  );
};

export default Dashboard;
