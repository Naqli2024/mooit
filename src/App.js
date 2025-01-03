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
import SalesOrder from "./Pages/Dashboard/SalesOrder";
import Packages from "./Pages/Dashboard/Packages";
import Storage from "./Pages/Dashboard/Storage";
import Return from "./Pages/Dashboard/Return";
import FloorManagement from "./Pages/Dashboard/FloorManagement";
import VendorPayment from "./Pages/Dashboard/VendorPayment";
import Customer from "./Pages/Dashboard/Customer";
import Invoices from "./Pages/Dashboard/Invoices";
import VendorManagement from "./Pages/Dashboard/VendorManagement";
import Dashboard from "./Pages/Dashboard/Dashboard/Dashboard";
import PurchaseList from "./Pages/Dashboard/Purchase/PurchaseList";
import Items from "./Pages/Dashboard/InventoryManagement/Items";

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
            <Route path="items" element={<Items />}/>
            <Route path="sales-order" element={<SalesOrder />} />
            <Route path="packages" element={<Packages />} />
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
    </>
  );
}

export default App;
