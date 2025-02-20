import { getPurchaseByproductName } from "../Redux/features/getPurchaseByProductName";
import { getShipmentDetails } from "../Redux/shipment/shipmentSlice";
import { toast } from 'react-toastify';

export const findCustomerByName = (customers, selectedValue) => {
  return customers.find(
    (customer) =>
      `${customer.basicInformation.firstName} ${customer.basicInformation.lastName}` ===
      selectedValue
  );
};

export const processSaleOrderItems = async (saleOrderData, dispatch) => {
    try {
      const shipmentDetails = await dispatch(getShipmentDetails(saleOrderData.salesOrderId));
  
      if (shipmentDetails?.type === 'getShipmentDetails/rejected' || !shipmentDetails?.payload) {
        toast.error(shipmentDetails?.payload || "No shipment details found for this Sales Order ID.");
        return;
      }
  
      // Extracting item names from saleOrderData
      const productNames = saleOrderData.itemDetails.map(item => item.name || item.itemName);
  
      // If no product names, return early
      if (productNames.length === 0) {
        toast.error("No valid product names found.");
        return;
      }
  
      // Call the API to fetch purchase data by product names
      const response = await dispatch(getPurchaseByproductName(productNames));
  
      // Check if response is valid
      if (response?.type === 'getPurchaseByproductName/rejected' || !response?.payload || response?.payload.length === 0) {
        toast.error(response?.payload?.message || "No products found for the given names.");
        return;
      }
  
      // If API call was successful, process the SKU response and map it to itemDetails
      const updatedItemDetails = saleOrderData.itemDetails.map((item, index) => {
        const sku = response.payload[index]?.sku || ""; // Get SKU from API response
        const unitPrice = response.payload[index]?.unitPrice || 0;
        return {
          itemName: item.name || item.itemName,
          sku: sku,
          unitPrice: unitPrice,
          quantity: item.quantity
        };
      });
  
      // Create itemDetails object
      const itemDetails = updatedItemDetails.map(item => ({
        itemName: item.itemName,
        sku: item.sku,
        unitPrice: item.unitPrice,
        reason: "",
        shipped: item.quantity,
        returned: 0,
        returnQty: 0,
        receivableQty: 0,
        creditQty: 0,
      }));
      return itemDetails;
    } catch (error) {
      toast.error("Error processing sale order items:", error);
    }
  };