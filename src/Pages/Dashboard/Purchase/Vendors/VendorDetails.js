import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { Menu, MenuItem, IconButton, Breadcrumbs } from "@mui/material";
import VendorBasicInformation from "./VendorBasicInformation";
import VendorAddress from "./VendorAddress";
import VendorPurchaseOrder from "./VendorPurchaseOrder";
import { Padding } from "@mui/icons-material";

const VendorDetails = ({ backToList }) => {
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
        return <VendorBasicInformation />;
      case "Address":
        return <VendorAddress />;
      case "Purchase Order":
        return <VendorPurchaseOrder />;
      default:
        return <VendorBasicInformation />;
    }
  };

  return (
    <div className="purchase-list">
      <h2>Vendors</h2>
      <button onClick={backToList} className="goBack-btn">
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
            activeTab === "Purchase Order" ? "active-tab" : ""
          }`}
          onClick={() => setActiveTab("Purchase Order")}
        >
          Purchase Order
        </div>
        <div className="divider m-1"></div>
        <React.Fragment>
          <Menu
            anchorEl={openMoreIcon}
            open={Boolean(openMoreIcon)}
            onClose={handleClose}
            aria-labelledby="with-menu-demo-breadcrumbs"
          >
            <MenuItem onClick={handleClose}>Delete</MenuItem>
          </Menu>
          <Breadcrumbs aria-label="breadcrumbs">
            <IconButton
              className="more-icon-btn"
              size="large"
              onClick={handleClick}
            >
              <MoreVertOutlinedIcon />
            </IconButton>
          </Breadcrumbs>
        </React.Fragment>
        <div className="divider"></div>
      </div>
      <div>{renderContent()}</div>
    </div>
  );
};

export default VendorDetails;
