import { configureStore } from "@reduxjs/toolkit";
import purchaseReducer from "./features/purchaseSlice";
import getPurchaseDetailsReducer from "./features/getPurchaseDetailsSlice";
import findPurchaseByIdReducer from "./features/findPurchaseByIdSlice";
import findPurchaseByItemName from "./features/findPurchaseSlice";
import generateSku from "./features/generateSkuForProduct";
import generateHsnCode from "./features/generateHsnCode";
import createInventoryReducer from "./inventory/createInventorySlice";
import getInventoriesReducer from "./inventory/getInventoriesSlice";
import getInventoryBySku from "./inventory/getInventoryBySku";
import getAllSalesOrderSlice from "./salesOrder/getSaleOrder";
import createSaleOrderSlice from "./salesOrder/createSaleOrder";
import getSaleOrderBySaleOrderIdSlice from "./salesOrder/getSaleOrderByIdSlice";
import updateSaleOrderStatusSlice from "./salesOrder/updateSaleOrderStatus";
import deleteSaleOrderByIdSlice from "./salesOrder/deleteSaleOrderById";
import getConfirmedSaleOrderSlice from "./salesOrder/getConfirmedSaleOrder";
import generateSalesOrderIdSlice from "./salesOrder/generateSalesOrderId";
import newPackageSlice from "./package/createNewPackage";
import packageIdSlice from "./package/getPackageIdSlice";
import getPackageDetailsByPackageSlipSlice from "./package/getPackageDetails";
import getAllPackageSlice from "./package/getAllPackages";
import deletePackageSlice from "./package/deletePackage";
import shipmentReducer from "./shipment/shipmentSlice";
import sourceDepartmentReducer from "./sourceDepartment/sourceDepartmentSlice";
import vendorReducer from "./vendor/vendorSlice";
import deliveryChallanReducer from "./deliveryChallan/deliveryChallanSlice";
import categorySlice from "./category/categorySlice";

const store = configureStore({
  reducer: {
    purchase: purchaseReducer,
    getPurchaseDetails: getPurchaseDetailsReducer,
    findPurchaseById: findPurchaseByIdReducer,
    findPurchaseByItemName: findPurchaseByItemName,
    generateSku: generateSku,
    generateHsnCode: generateHsnCode,
    createInventoryReducer: createInventoryReducer,
    getInventories: getInventoriesReducer,
    getInventoryBySku: getInventoryBySku,
    getAllSalesorder: getAllSalesOrderSlice,
    createSaleOrder: createSaleOrderSlice,
    getSaleOrderBySaleOrderId: getSaleOrderBySaleOrderIdSlice,
    updateSaleOrderStatus: updateSaleOrderStatusSlice,
    deleteSaleOrderById: deleteSaleOrderByIdSlice,
    generateSalesOrderId: generateSalesOrderIdSlice,
    getConfirmedSales: getConfirmedSaleOrderSlice,
    newPackage: newPackageSlice,
    packageId: packageIdSlice,
    getPackageDetails: getPackageDetailsByPackageSlipSlice,
    getAllPackages: getAllPackageSlice,
    deletePackage: deletePackageSlice,
    shipment: shipmentReducer,
    sourceDepartment: sourceDepartmentReducer,
    vendor: vendorReducer,
    deliveryChallan: deliveryChallanReducer,
    category: categorySlice
  },
});

export default store;
