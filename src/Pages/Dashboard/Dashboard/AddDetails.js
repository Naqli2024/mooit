import React from "react";
import { overAllData } from "../../../Data/DashboardData";

const AddDetails = () => {
  return (
    <div className="col-md-8 dashboard-head">
      <div className="dropdown-container">
        <select className="custom-dropdown">
          <option value="all-time">All Time</option>
          <option value="monthly">Monthly</option>
          <option value="this-week">This Week</option>
          <option value="this-year">This Year</option>
        </select>
      </div>
      {overAllData.map((overAllData, index) => (
        <div className="custom-box" key={index}>
          <p className="number">{overAllData.count}</p>
          <p className="description">{overAllData.name}</p>
        </div>
      ))}
    </div>
  );
};

export default AddDetails;
