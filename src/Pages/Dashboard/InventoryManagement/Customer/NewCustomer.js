import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CreateNewCustomerAddress from "./CreateNewCustomerAddress";
import CreateNewCustomerBasicInformation from "./CreateNewCustomerBasicInformation";

const NewCustomer = ({ backToList, customerDetails }) => {
  const [activeTab, setActiveTab] = useState("Basic Information");

  const renderContent = () => {
    switch (activeTab) {
      case "Basic Information":
        return (
          <CreateNewCustomerBasicInformation
            backToList={backToList}
            customerDetails={customerDetails}
          />
        );
      case "Address":
        return <CreateNewCustomerAddress backToList={backToList} />;
      default:
        return <CreateNewCustomerBasicInformation backToList={backToList} />;
    }
  };
  return (
    <div className="purchase-list">
      <h2>New Customer</h2>
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

export default NewCustomer;
