import React from "react";
import { topSellingItems } from "../../../Data/DashboardData";

const TopSellingItem = () => {
  return (
    <div className="col-md-6 product-details top-selling">
      <h4>Top selling item</h4>
      <div className="dropdown-container selling-dropdown">
        <select className="custom-dropdown">
          <option value="all-time">All Time</option>
          <option value="monthly">Monthly</option>
          <option value="this-week">This Week</option>
          <option value="this-year">This Year</option>
        </select>
      </div>
      <div className="top-selling-item">
        {topSellingItems.map((topSellingItem, index) => (
          <div className="custom-box" key={index}>
            <p className="number">{topSellingItem.name}</p>
            <p className="description">Qty sold - {topSellingItem.QtySold}</p>
            <p className="description">Revenue - {topSellingItem.Revenue}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSellingItem;
