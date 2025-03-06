import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findPurchaseByItemName } from "../../../../Redux/features/findPurchaseSlice";
import { fetchInventoryBySku } from "../../../../Redux/inventory/getInventoryBySku";

const ProductOverview = ({sku}) => {
  const dispatch = useDispatch();
  const { loading, product, error } = useSelector(
    (state) => state.findPurchaseByItemName
  );
  const {inventoryBySku} = useSelector(state => state.getInventoryBySku)

  useEffect(() => {
      if (sku) {
        dispatch(findPurchaseByItemName({sku: sku})); 
        dispatch(fetchInventoryBySku(sku));
      }
    }, [sku]);

  return (
    <div className="product-overview">
      <div className=" col-md-3 overview-left-content">
        <div className="overview-content">
          <div className="col-md-5 text-secondary">SKU</div>
          <div className="col-md-1">-</div>
          <div className="col-md-3">{product && product.sku}</div>
        </div>
        <div className="overview-content">
          <div className="col-md-5 text-secondary">Part number</div>
          <div className="col-md-1">-</div>
          <div className="col-md-3">{product && product.partNumber}</div>
        </div>
        <div className="overview-content">
          <div className="col-md-5 text-secondary">HSN code</div>
          <div className="col-md-1">-</div>
          <div className="col-md-3">{product && product.hsnCode}</div>
        </div>
        <div className="overview-content">
          <div className="col-md-5 text-secondary">Brand name</div>
          <div className="col-md-1">-</div>
          <div className="col-md-3">{product && product.brandName}</div>
        </div>
        <div className="overview-content">
          <div className="col-md-5 text-secondary">Category</div>
          <div className="col-md-1">-</div>
          <div className="col-md-3">{product && product.category}</div>
        </div>
      </div>
      <div className="overview-right-content">
        <div className="open-inventory">
          <div className="col-md-8">Opening inventory</div>
          <div className="col-md-3">{inventoryBySku?.inventoryTracking.openingInventory}</div>
        </div>
        <div className="restock-point mt-3">
          <div className="col-md-8">Restock point</div>
          <div className="col-md-3">{inventoryBySku?.inventoryTracking.restockPoint}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
