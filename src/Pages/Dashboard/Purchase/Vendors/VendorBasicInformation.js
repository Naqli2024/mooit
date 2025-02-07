import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const VendorBasicInformation = () => {
  const { vendors } = useSelector((state) => state.vendor);
  const { basicInformation } = vendors || {};

  return (
    <div>
      <div className="vendor-info">
        <div className="col-md-3">
          <div className="overview-content">
            <div className="col-md-8">First Name</div>
            <div className="col-md-2">-</div>
            <div className="col-md-8">{basicInformation?.firstName}</div>
          </div>
          <div className="overview-content">
            <div className="col-md-8">Last Name</div>
            <div className="col-md-2">-</div>
            <div className="col-md-8">{basicInformation?.lastName}</div>
          </div>
          <div className="overview-content">
            <div className="col-md-8">Company name</div>
            <div className="col-md-2">-</div>
            <div className="col-md-8">{basicInformation?.companyName}</div>
          </div>
          <div className="overview-content">
            <div className="col-md-8">Email id</div>
            <div className="col-md-2">-</div>
            <div className="col-md-8">{basicInformation?.emailId}</div>
          </div>
          <div className="overview-content">
            <div className="col-md-8">Mobile no</div>
            <div className="col-md-2">-</div>
            <div className="col-md-8">{basicInformation?.Mobile}</div>
          </div>
          <div className="overview-content">
            <div className="col-md-8">Landline no</div>
            <div className="col-md-2">-</div>
            <div className="col-md-8">{basicInformation?.landLine}</div>
          </div>
          <div className="overview-content">
            <div className="col-md-8">Website</div>
            <div className="col-md-2">-</div>
            <div className="col-md-8 text-primary">
              <Link to={basicInformation?.website || "#"}>{basicInformation?.website}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorBasicInformation;
