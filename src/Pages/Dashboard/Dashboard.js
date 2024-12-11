import React from "react";
import { overAllData, productDetails } from "../../Data/DashboardData";

const Dashboard = () => {
  return (
    <>
      <div className="row dashboard">
        <div className="col-md-8 dashboard-head">
          {overAllData.map((overAllData, index) => {
            return (
              <div class="custom-box " key={index}>
                <p class="number">{overAllData.count}</p>
                <p class="description">{overAllData.name}</p>
              </div>
            );
          })}
        </div>
        <div className="col-md-4 product-details">
          <h4>Product details</h4>
          <div className="product-details-sub">
            <img src="" alt="product image" />
            <div className="product-details-container">
              {productDetails.map((productDetail, index) => (
                <div className="product-details-item" key={index}>
                  <p className="category">{productDetail.category}</p>
                  <p className="count">{productDetail.count}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
