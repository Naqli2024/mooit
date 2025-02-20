import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { Menu, MenuItem, IconButton, Breadcrumbs } from "@mui/material";
import CustomerBasicInformation from "./CustomerBasicInformation";
import CustomerAddress from "./CustomerAddress";
import CustomerSales from "./CustomerSales";

const CustomerDetails = ({backToList}) => {
    const [openMoreIcon, setOpenMoreIcon] = useState(null);
    const [activeTab, setActiveTab] = useState("Basic Information");
  
    const handleClick = (event) => {
      if (event) {
        setOpenMoreIcon(event.currentTarget);
      }
    };

    const handleClose = () => {
      setOpenMoreIcon(null);
    };
  
    const renderContent = () => {
      switch (activeTab) {
        case "Basic Information":
          return <CustomerBasicInformation />;
        case "Address":
          return <CustomerAddress />;
        case "Sales":
          return <CustomerSales />;
        default:
          return <CustomerBasicInformation />;
      }
    };

  return (
    <div className="purchase-list">
    <h2>Customer</h2>
    <button onClick={() => backToList()} className="goBack-btn">
      <span>
        <ArrowBackIosIcon />
      </span>
      Back
    </button>
    <div className="edit-print-del-btn">
      <div
        className={`action-btn ${
          activeTab === "Basic Information" ? "active-tab" : ""
        }`}
        onClick={() => setActiveTab("Basic Information")}
      >
        Basic Information
      </div>
      <div className="divider"></div>
      <div
        className={`action-btn ${
          activeTab === "Address" ? "active-tab" : ""
        }`}
        onClick={() => setActiveTab("Address")}
      >
        Address
      </div>
      <div className="divider"></div>
      <div
        className={`action-btn ${
          activeTab === "Sales" ? "active-tab" : ""
        }`}
        onClick={() => setActiveTab("Sales")}
      >
        Sales
      </div>
    </div>
    <div>{renderContent()}</div>
  </div>
  )
}

export default CustomerDetails