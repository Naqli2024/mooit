import { configureStore } from "@reduxjs/toolkit";
import purchaseReducer from "./features/purchaseSlice";
import getPurchaseDetailsReducer from "./features/getPurchaseDetailsSlice";
import findPurchaseByIdReducer from "./features/findPurchaseByIdSlice";
import findPurchaseByItemName from "./features/findPurchaseSlice";
import createInventoryReducer from "./inventory/createInventorySlice";
import getInventoriesReducer from "./inventory/getInventoriesSlice";
import getInventoryBySku from "./inventory/getInventoryBySku";
import getAllSalesOrderSlice from "./salesOrder/getSaleOrder";
import createSaleOrderSlice from "./salesOrder/createSaleOrder";

const store = configureStore({
  reducer: {
    purchase: purchaseReducer,
    getPurchaseDetails: getPurchaseDetailsReducer,
    findPurchaseById: findPurchaseByIdReducer,
    findPurchaseByItemName: findPurchaseByItemName,
    createInventoryReducer: createInventoryReducer,
    getInventories: getInventoriesReducer,
    getInventoryBySku: getInventoryBySku,
    getAllSalesorder: getAllSalesOrderSlice,
    createSaleOrder: createSaleOrderSlice
  },
});

export default store;
