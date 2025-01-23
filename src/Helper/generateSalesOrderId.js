export function generateSalesOrderId() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const sequentialNumber = Math.floor(Math.random() * 10000); 

  return `SO-${year}${month}${day}-${String(sequentialNumber).padStart(
    4,
    "0"
  )}`;
}
