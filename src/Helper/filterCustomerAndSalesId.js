export function filterCustomerAndSalesId(allSaleOrder) {
  const data =
    allSaleOrder &&
    allSaleOrder.map((saleData) => ({
      customerName: saleData.customerName,
      salesOrderId: saleData.salesOrderId
    }));
    return data;
}
