import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
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
import SalesReturn from "./Pages/Dashboard/InventoryManagement/SalesReturn/SalesReturn";
import CreditNote from "./Pages/Dashboard/InventoryManagement/CreditNote/CreditNote";
import SalesInvoice from "./Pages/Dashboard/InventoryManagement/SalesInvoice/SalesInvoice";
import Employees from "./Pages/Dashboard/Employees/Employees";
import DashboardHeader from "./Pages/Header/DashboardHeader";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import UpdatePassword from "./Pages/Auth/UpdatePassword";
import InVerifyEmail from "./Pages/Auth/verifyEmail";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./Redux/auth/authSlice";
import ProtectedRoute from "./ProtectedRoute";
import UserProfile from "./Pages/Accounts/UserProfile";
import UserPassword from "./Pages/Accounts/UserPassword";
import UserSettings from "./Pages/Accounts/UserSettings";
import DeleteAccount from "./Pages/Accounts/DeleteAccount";
import AccountMain from "./Pages/Accounts/AccountMain";
import Authentication from "./Pages/Accounts/Authentication";
import CompanyDetailsForm from "./Pages/CompanyDetails/CompanyDetailsForm";
import FloorManagement from "./Pages/Dashboard/WarehouseManagement/FloorManagement/FloorManagement";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.createAccount);
  const showHeader = ![
    "/",
    "/login",
    "/signup",
    "/user/updatePassword",
    "/verify-email",
    "/admin/authentication"
  ].includes(location.pathname);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      {showHeader && <DashboardHeader />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={data?.data?.user ? <Navigate to="/admin/dashboard" /> : <Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user/updatePassword" element={<UpdatePassword />} />
        <Route path="/verify-email" element={<InVerifyEmail />} />
        <Route path="/admin/authentication" element={<Authentication />} />
        {/* Protected Routes */}
        <Route element={data ? <ProtectedRoute /> : <Navigate to="/login" />}>
          <Route path="/admin" element={<Main />}>
            <Route index element={<Navigate to="/admin/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="company-details" element={<CompanyDetailsForm />} />
            <Route path="purchase-list" element={<PurchaseList />} />
            <Route path="vendors" element={<Vendors />} />
            <Route path="purchase-details/:id" element={<PurchaseDetails />} />
            <Route path="items" element={<Items />} />
            <Route path="sales" element={<Sales />} />
            <Route path="sales-return" element={<SalesReturn />} />
            <Route path="credit-note" element={<CreditNote />} />
            {/* <Route path="debit-note" element={<DebitNote />} /> */}
            <Route path="salesorder" element={<SalesOrder />} />
            <Route path="packages" element={<Packages />} />
            <Route path="shipments" element={<Shipments />} />
            <Route path="delivery-challans" element={<DeliveryChallans />} />
            <Route path="source-department" element={<SourceDepartment />} />
            <Route path="category" element={<Category />} />
            <Route path="storage" element={<Storage />} />
            <Route path="return" element={<Return />} />
            <Route path="floor-management" element={<FloorManagement />} />
            {/* <Route path="transfer-log" element={<TransferLog />} /> */}
            <Route path="vendor-management" element={<VendorManagement />} />
            <Route path="vendor-payment" element={<VendorPayment />} />
            <Route path="customer" element={<Customer />} />
            <Route path="sales-invoice" element={<SalesInvoice />} />
            {/* <Route path="purchase-invoice" element={<PurchaseInvoice />} />
            <Route path="purchase-return" element={<PurchaseReturn />} /> */}
            <Route path="employees" element={<Employees />} />
          </Route>
        </Route>
        <Route path="/admin/account" element={<AccountMain />}>
            <Route index element={<Navigate to="/admin/account/userProfile" />} />
            <Route path="userProfile" element={<UserProfile/>} />
            <Route path="password" element={<UserPassword/>} />
            <Route path="settings" element={<UserSettings/>} />
            <Route path="delete-account" element={<DeleteAccount/>} />
          </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
