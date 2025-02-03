import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CreateNewBasicInformation from "./CreateNewBasicInformation";
import CreateNewAddress from "./CreateNewAddress";
const NewVendor = ({ backToList }) => {
  const [activeTab, setActiveTab] = useState("Basic Information");

  const renderContent = () => {
    switch (activeTab) {
      case "Basic Information":
        return <CreateNewBasicInformation backToList={backToList}/>;
      case "Address":
        return <CreateNewAddress backToList={backToList}/>;
      default:
        return <CreateNewBasicInformation backToList={backToList}/>;
    }
  };
  return (
    <div className="purchase-list">
      <h2>New Vendors</h2>
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
        <div className="divider m-1"></div>
      </div>
      <div>{renderContent()}</div>
    </div>
  );
};

export default NewVendor;
