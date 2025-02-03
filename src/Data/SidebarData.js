export const dashboardItems = [
  { item: "Dashboard", path: "dashboard" },
  {
    item: "Purchase",
    path: "purchase",
    submenus: [
      { item: "Purchase List", path: "purchase-list" },
      { item: "Vendors", path: "vendors" },
    ],
  },
  {
    item: "Inventory management",
    path: "inventory-management",
    submenus: [
      { item: "Items", path: "items", },
      { item: "Sales", path: "sales" },
      { item: "Sales order", path: "salesorder" },
      { item: "Packages", path: "packages" },
      { item: "Shipments", path: "shipments" },
      { item: "Delivery challans", path: "delivery-challans" },
      { item: "Source department", path: "source-department" },
      { item: "Customer", path: "customer" },
      { item: "Category", path: "category" },
    ],
  },
  { item: "Warehouse management", path: "warehouse-management" },
  { item: "Invoice", path: "invoice" },
  { item: "User", path: "user" },
];
