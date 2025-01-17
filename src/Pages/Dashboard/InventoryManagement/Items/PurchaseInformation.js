import React from "react";
import { useDispatch, useSelector } from "react-redux";

const PurchaseInformation = () => {
  const { loading, product, error } = useSelector(
    (state) => state.findPurchaseByItemName
  );
  return (
    <div>
      <div className="purchase-info">
        <div className="purchaseInfo-content">
          <div className="col-md-2 text-secondary">MRP</div>
          <div className="col-md-1">-</div>
          <div className="col-md-3">{product.MRP}</div>
        </div>
        <div className="purchaseInfo-content">
          <div className="col-md-2 text-secondary">Purchase amount</div>
          <div className="col-md-1">-</div>
          <div className="col-md-3">{product.purchaseRate}</div>
        </div>
        <div className="purchaseInfo-content">
          <div className="col-md-2 text-secondary">Unit price</div>
          <div className="col-md-1">-</div>
          <div className="col-md-3">{product.unitPrice}</div>
        </div>
        <div className="purchaseInfo-content">
          <div className="col-md-2 text-secondary">GST</div>
          <div className="col-md-1">-</div>
          <div className="col-md-3">{product.GST}</div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseInformation;
