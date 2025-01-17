import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductStorageLocation = () => {
  const {loading, product, error} = useSelector(state => state.findPurchaseByItemName)
  return (
    <div>
      <div className="storage-location">
        <div className="storage-content">
          <div className="col-md-2 text-secondary">Warehouse name</div>
          <div className="col-md-1">-</div>
          <div className="col-md-3">{product.wareHouse}</div>
        </div>
        <div className="storage-content">
          <div className="col-md-2 text-secondary">Rack</div>
          <div className="col-md-1">-</div>
          <div className="col-md-3">{product.rack}</div>
        </div>
        <div className="storage-content">
          <div className="col-md-2 text-secondary">Shelf</div>
          <div className="col-md-1">-</div>
          <div className="col-md-3">{product.shelf}</div>
        </div>
        <div className="storage-content">
          <div className="col-md-2 text-secondary">Shelf Space</div>
          <div className="col-md-1">-</div>
          <div className="col-md-3">{product.shelfSpace}</div>
        </div>
        <div className="storage-content">
          <div className="col-md-2 text-secondary">Storage Condition</div>
          <div className="col-md-1">-</div>
          <div className="col-md-3">{product.storageCondition}</div>
        </div>
        <div className="storage-content">
          <div className="col-md-2 text-secondary">Storage date</div>
          <div className="col-md-1">-</div>
          <div className="col-md-3">{product.storageDate}</div>
        </div>
        <div className="storage-content">
          <div className="col-md-2 text-secondary">Expiry date</div>
          <div className="col-md-1">-</div>
          <div className="col-md-3">{product.expiryDate}</div>
        </div>
        <div className="storage-content">
          <div className="col-md-2 text-secondary">Location</div>
          <div className="col-md-1">-</div>
          <div className="col-md-3">XXXXXXXXXXXX</div>
        </div>
      </div>
    </div>
  );
};

export default ProductStorageLocation;
