import React from "react";

const ProductStorageLocation = () => {
  return (
    <div>
      <div className="storage-location">
        <div className="storage-content">
          <div className="col-md-2 text-secondary">Warehouse name</div>
          <div className="col-md-1">-</div>
          <div className="col-md-3">Warehouse 1</div>
        </div>
        <div className="storage-content">
          <div className="col-md-2 text-secondary">Rack</div>
          <div className="col-md-1">-</div>
          <div className="col-md-3">RackB</div>
        </div>
        <div className="storage-content">
          <div className="col-md-2 text-secondary">Shelf</div>
          <div className="col-md-1">-</div>
          <div className="col-md-3">Shelf B2</div>
        </div>
        <div className="storage-content">
          <div className="col-md-2 text-secondary">Shelf</div>
          <div className="col-md-1">-</div>
          <div className="col-md-3">Shelf B2-5</div>
        </div>
        <div className="storage-content">
          <div className="col-md-2 text-secondary">Storage Condition</div>
          <div className="col-md-1">-</div>
          <div className="col-md-3">Refrigerator</div>
        </div>
        <div className="storage-content">
          <div className="col-md-2 text-secondary">Storage date</div>
          <div className="col-md-1">-</div>
          <div className="col-md-3">23/04/2024</div>
        </div>
        <div className="storage-content">
          <div className="col-md-2 text-secondary">Expiry date</div>
          <div className="col-md-1">-</div>
          <div className="col-md-3">23/04/2025</div>
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
