import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ProductOverview from "./ProductOverview";
import ProductStorageLocation from "./ProductStorageLocation";
import PurchaseInformation from "./PurchaseInformation";
import ProductHistory from "./ProductHistory";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ProductSalesInformation from "./ProductSalesInformation";
import { useDispatch, useSelector } from "react-redux";
import { findPurchaseByItemName } from "../../../../Redux/features/findPurchaseSlice";

const ProductDetails = ({ backToList, sku }) => {
  const [activeTab, setActiveTab] = useState("Overview");
  const dispatch = useDispatch();
  const { loading, product, error } = useSelector(
    (state) => state.findPurchaseByItemName
  );
    const { inventories } = useSelector(
      (state) => state.getInventories
    );

  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return <ProductOverview sku={sku} />;
      case "Storage location":
        return <ProductStorageLocation />;
      case "Purchase information":
        return <PurchaseInformation />;
      case "Sales information":
        return <ProductSalesInformation />;
      case "History":
        return <ProductHistory />;
      default:
        return <ProductOverview />;
    }
  };

  useEffect(() => {
    if (sku) {
      dispatch(findPurchaseByItemName({sku: sku})); 
    }
  }, [sku]);

  return (
    <div>
      <div className="purchase-list">
        <h2>Inventory Management</h2>
      </div>
      <button onClick={backToList} className="goBack-btn">
        <span>
          <ArrowBackIosIcon />
        </span>
        Back
      </button>
      <div className="product-details-content">
        <div className="product-title">
          <p className="fw-bold">Product name: {product && product.productName}</p>
          <p className="edit-icon">
            <span>
              <EditOutlinedIcon />
            </span>
            Edit
          </p>
        </div>
        <div className="product-navigation">
          {[
            "Overview",
            "Storage location",
            "Purchase information",
            "Sales information",
            "History",
          ].map((tab) => (
            <div
              key={tab}
              className={`tab-item ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
        <hr className="inventory-divider" />
        {renderContent()}
      </div>
    </div>
  );
};

export default ProductDetails;
