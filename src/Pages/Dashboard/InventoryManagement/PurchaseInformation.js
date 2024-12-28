import React from "react";

const PurchaseInformation = () => {
  return (
    <div>
      <div className="purchase-info">
        <div className="purchaseInfo-content">
          <div className="col-md-2 text-secondary">MRP</div>
          <div className="col-md-1">-</div>
          <div className="col-md-3">7685</div>
        </div>
        <div className="purchaseInfo-content">
          <div className="col-md-2 text-secondary">Purchase amount</div>
          <div className="col-md-1">-</div>
          <div className="col-md-3">4567</div>
        </div>
        <div className="purchaseInfo-content">
          <div className="col-md-2 text-secondary">Unit price</div>
          <div className="col-md-1">-</div>
          <div className="col-md-3">100</div>
        </div>
        <div className="purchaseInfo-content">
          <div className="col-md-2 text-secondary">GST</div>
          <div className="col-md-1">-</div>
          <div className="col-md-3">5%</div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseInformation;
