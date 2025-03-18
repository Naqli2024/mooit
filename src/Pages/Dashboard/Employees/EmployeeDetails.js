import React, { useState } from "react";
import Header from "../../../assests/images/employeeHeader.svg";
import PersonIcon from "@mui/icons-material/Person";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EmployeeBasicInfo from "./EmployeeBasicInfo";
import EmployeeAddress from "./EmployeeAddress";
import EmployeeAcDetails from "./EmployeeAcDetails";
import EmployeeProfDetails from "./EmployeeProfDetails";
import CloseIcon from "@mui/icons-material/Close";
import Loader from "../../../Helper/Loader";
import { useDispatch, useSelector } from "react-redux";
import { profilePhoto } from "../../../Helper/fetchProfilePhoto";
import { editEmployee } from "../../../Redux/employee/employeeSlice";
import { toast, ToastContainer } from "react-toastify";

const EmployeeDetails = ({ backToList, employee, setOpenNewEmployeeDetails }) => {
  const [activeTab, setActiveTab] = useState("Basic Information");
  const { loading } = useSelector((state) => state.employee);
  const [localEmployee, setLocalEmployee] = useState(employee);
  const dispatch = useDispatch();

  const renderContent = () => {
    switch (activeTab) {
      case "Basic Information":
        return <EmployeeBasicInfo employee={employee} />;
      case "Address":
        return <EmployeeAddress employee={employee} />;
      case "Account details":
        return <EmployeeAcDetails employee={employee} />;
      case "Professional Information":
        return <EmployeeProfDetails employee={employee} />;
      default:
        return <EmployeeBasicInfo />;
    }
  };

  const handleClick = (status, employeeId) => {
    const payload = {
      accountStatus: status,
    };
    dispatch(editEmployee({ employeeId, payload }))
      .unwrap()
      .then((response) => {
        setLocalEmployee((prev) => ({ ...prev, accountStatus: status }));
        toast.success(response.message, {
          position: "top-center",
          autoClose: 1000,
        });
      })
      .catch((error) => toast.error(error));
  };

  const employeeDetails = [
    "Basic Information",
    "Address",
    "Account details",
    "Professional Information",
  ];
  return (
    <>
      {loading && <Loader />}
      <div className="purchase-list">
        <div className="employee-header-container">
          <img src={Header} alt="employee-header" className="employee-header" />
          <div className="emp-cancel-icon personAvatar" onClick={() => setOpenNewEmployeeDetails(false)}>
            <CloseIcon />
          </div>
        </div>
        <div className="employee-profile">{profilePhoto(employee)}</div>
        <div className="emp-detail">
          <div className="d-md-flex align-items-center">
            <div className="fw-bold">
              {employee?.firstName} {employee?.lastName}
            </div>
            <div className="emp-id">{employee?.mobileNo}</div>
            <div className="emp-action">
              <div
                className="block-text"
                onClick={() =>
                  handleClick(
                    localEmployee?.accountStatus === "Active"
                      ? "Inactive"
                      : "Active",
                    localEmployee?.employeeId
                  )
                }
              >
                {localEmployee?.accountStatus === "Active"
                  ? "Block"
                  : "Re-Activate"}
              </div>
              {/* <div className="personAvatar cursor-pointer">
                <EditOutlinedIcon />
              </div> */}
            </div>
          </div>
          <div className="emp-role">{employee?.jobTitle}</div>
          <div className="product-navigation">
            {employeeDetails.map((tab) => (
              <div
                key={tab}
                className={`tab-item ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </div>
            ))}
          </div>
          <hr className="inventory-divider" />
          {renderContent()}
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default EmployeeDetails;
