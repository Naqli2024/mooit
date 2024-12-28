import React from "react";

const ProductOverview = () => {
  return (
    <div className="product-overview">
      <div className=" col-md-3 overview-left-content">
        <div className="overview-content">
          <div className="col-md-5">SKU</div>
          <div className="col-md-1">-</div>
          <div className="col-md-3">NG-7687</div>
        </div>
        <div className="overview-content">
          <div className="col-md-5">Part number</div>
          <div className="col-md-1">-</div>
          <div className="col-md-3">NGH766456</div>
        </div>
        <div className="overview-content">
          <div className="col-md-5">HNS code</div>
          <div className="col-md-1">-</div>
          <div className="col-md-3">HGJ56748</div>
        </div>
        <div className="overview-content">
          <div className="col-md-5">Brand name</div>
          <div className="col-md-1">-</div>
          <div className="col-md-3">XXXXXXXXXX</div>
        </div>
        <div className="overview-content">
          <div className="col-md-5">Category</div>
          <div className="col-md-1">-</div>
          <div className="col-md-3">XXXXXXXXXX</div>
        </div>
      </div>
      <div className="overview-right-content">
        <div className="open-inventory">
          <div className="col-md-8">Opening inventory</div>
          <div className="col-md-3 text-end">-</div>
          <div className="col-md-3">300</div>
        </div>
        <div className="restock-point mt-3">
          <div className="col-md-8">Restock point</div>
          <div className="col-md-3 text-end">-</div>
          <div className="col-md-3">50</div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
