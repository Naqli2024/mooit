import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Header from "./Pages/Header/Header";
import HomePage from "./Pages/Home/HomePage";
import NotFound from "./Pages/NotFound";
import "./styles/style.css";
import Main from "./Pages/Dashboard/Main";
import SalesOrder from "./Pages/Dashboard/InventoryManagement/Salesorder/SalesOrder";
import Packages from "./Pages/Dashboard/InventoryManagement/Packages/Packages";
import Storage from "./Pages/Dashboard/Storage";
import Return from "./Pages/Dashboard/Return";
import FloorManagement from "./Pages/Dashboard/FloorManagement";
import VendorPayment from "./Pages/Dashboard/VendorPayment";
import Invoices from "./Pages/Dashboard/Invoices";
import VendorManagement from "./Pages/Dashboard/VendorManagement";
import Dashboard from "./Pages/Dashboard/Dashboard/Dashboard";
import PurchaseList from "./Pages/Dashboard/Purchase/PurchaseList/PurchaseList";
import Vendors from "./Pages/Dashboard/Purchase/Vendors/Vendors";
import Items from "./Pages/Dashboard/InventoryManagement/Items/Items";
import PurchaseDetails from "./Pages/Dashboard/Purchase/PurchaseList/PurchaseDetails";
import Sales from "./Pages/Dashboard/InventoryManagement/Sales/Sales";
import DeliveryChallans from "./Pages/Dashboard/InventoryManagement/DeliveryChallans/DeliveryChallans";
import Shipments from "./Pages/Dashboard/InventoryManagement/Shipments/Shipments";
import SourceDepartment from "./Pages/Dashboard/InventoryManagement/SourceDepartment/SourceDepartment";
import Category from "./Pages/Dashboard/InventoryManagement/Category/Category";
import Customer from "./Pages/Dashboard/InventoryManagement/Customer/Customer";
import { ToastContainer } from "react-toastify";
import SalesReturn from "./Pages/Dashboard/InventoryManagement/SalesReturn/SalesReturn";
import CreditNote from "./Pages/Dashboard/InventoryManagement/CreditNote/CreditNote";
import SalesInvoice from "./Pages/Dashboard/InventoryManagement/SalesInvoice/SalesInvoice";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<Main />}>
            <Route index element={<Navigate to="/admin/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="purchase-list" element={<PurchaseList />} />
            <Route path="vendors" element={<Vendors />} />
            <Route path="purchase-details/:id" element={<PurchaseDetails />} />
            <Route path="items" element={<Items />} />
            <Route path="sales" element={<Sales />} />
            <Route path="salesorder" element={<SalesOrder />} />
            <Route path="packages" element={<Packages />} />
            <Route path="delivery-challans" element={<DeliveryChallans />} />
            <Route path="sales-return" element={<SalesReturn />} />
            <Route path="sales-invoice" element={<SalesInvoice />} />
            <Route path="credit-note" element={<CreditNote />} />
            <Route path="source-department" element={<SourceDepartment />} />
            <Route path="category" element={<Category />} />
            <Route path="shipments" element={<Shipments />} />
            <Route path="storage" element={<Storage />} />
            <Route path="return" element={<Return />} />
            <Route path="floor-management" element={<FloorManagement />} />
            <Route path="vendor-management" element={<VendorManagement />} />
            <Route path="vendor-payment" element={<VendorPayment />} />
            <Route path="customer" element={<Customer />} />
            <Route path="invoices" element={<Invoices />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
