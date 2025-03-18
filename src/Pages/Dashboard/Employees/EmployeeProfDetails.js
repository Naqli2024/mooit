import React from "react";
import EngineeringIcon from "@mui/icons-material/Engineering";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

const EmployeeProfDetails = ({ employee }) => {
  return (
    <div className="emp-overview">
      <div className="col-md-7 overview-left-content">
        <div className="emp-content">
          <p className="col-md-4">
            <span className="emp-info-icon">
              <EngineeringIcon />
            </span>
            Job title
          </p>
          <p className="col-md-1">-</p>
          <p className="col-md-5">{employee?.jobTitle}</p>
        </div>
        <div className="emp-content">
          <p className="col-md-4">
            <span className="emp-info-icon">
              <LocationCityIcon />
            </span>
            Department
          </p>
          <p className="col-md-1">-</p>
          <p className="col-md-5">{employee?.department}</p>
        </div>
        <div className="emp-content">
          <p className="col-md-4">
            <span className="emp-info-icon">
              <CalendarMonthIcon />
            </span>
            Date of joining
          </p>
          <p className="col-md-1">-</p>
          <p className="col-md-5">{employee?.dateOfJoining}</p>
        </div>
        <div className="emp-content">
          <p className="col-md-4">
            <span className="emp-info-icon">
              <AccessTimeFilledIcon />
            </span>
            Type of hire
          </p>
          <p className="col-md-1">-</p>
          <p className="col-md-5">{employee?.typeOfHire}</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfDetails;
