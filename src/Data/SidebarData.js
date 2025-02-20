import { FaTachometerAlt, FaShoppingCart, FaBoxes, FaWarehouse, FaFileInvoice, FaUsers } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
export const dashboardItems = [
  { item: "Dashboard", path: "dashboard", icon: <MdDashboard size={20} /> },
  {
    item: "Purchase",
    path: "purchase",
    icon: <FaShoppingCart />,
    submenus: [
      { item: "Purchase List", path: "purchase-list" },
      { item: "Vendors", path: "vendors" },
    ],
  },
  {
    item: "Inventory management",
    path: "inventory-management",
    icon: <FaBoxes />,
    submenus: [
      { item: "Items", path: "items" },
      { item: "Sales", path: "sales" },
      { item: "Sales order", path: "salesorder" },
      { item: "Packages", path: "packages" },
      { item: "Shipments", path: "shipments" },
      { item: "Delivery challans", path: "delivery-challans" },
      { item: "Sales return", path: "sales-return" },
      {item: "Sales invoice", path: "sales-invoice"},
      { item: "Credit note", path: "credit-note" },
      { item: "Source department", path: "source-department" },
      { item: "Customer", path: "customer" },
      { item: "Category", path: "category" },
    ],
  },
  { item: "Warehouse management", path: "warehouse-management", icon: <FaWarehouse /> },
  { item: "Invoice",
    path: "invoice",
    icon: <FaFileInvoice />,
    submenus: [
      {item: "Sales invoice", path: "sales-invoice"},
      {item: "Purchase invoice", path: "purchase-invoice"}
    ]
  },
  { item: "User", path: "user", icon: <FaUsers /> },
];
