import React from "react";
import PersonIcon from '@mui/icons-material/Person';
const VendorBasicInformation = () => {
  return (
    <div>
      <div className="vendor-info">
        <div className=" col-md-3 ">
          <div className="overview-content">
            <div className="col-md-8">Name</div>
            <div className="col-md-2">-</div>
            <div className="col-md-8">John</div>
          </div>
          <div className="overview-content">
            <div className="col-md-8">Company name</div>
            <div className="col-md-2">-</div>
            <div className="col-md-8">
              IronGate Manufacturing pvt
            </div>
          </div>
          <div className="overview-content">
            <div className="col-md-8">Email id</div>
            <div className="col-md-2">-</div>
            <div className="col-md-8">john02@gmail.com</div>
          </div>
          <div className="overview-content">
            <div className="col-md-8">Mobile no</div>
            <div className="col-md-2">-</div>
            <div className="col-md-8">8356643466</div>
          </div>
          <div className="overview-content">
            <div className="col-md-8">Landline no</div>
            <div className="col-md-2">-</div>
            <div className="col-md-8">8356643466</div>
          </div>
          <div className="overview-content">
            <div className="col-md-8">Website</div>
            <div className="col-md-2">-</div>
            <div className="col-md-8 text-primary">
              https:tl/JFH-FGUR8769MFD
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorBasicInformation;
