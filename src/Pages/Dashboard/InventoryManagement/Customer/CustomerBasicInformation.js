import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CustomerBasicInformation = () => {
  const { customers } = useSelector((state) => state.customers);
  const { basicInformation } = customers || {};

  return (
    <div>
      <div className="vendor-info">
        <p className="d-flex justify-content-end fw-bold">
          Credit amount : 4000
        </p>
        <div>
          <div className="overview-content d-flex justify-content-start ">
            <p className="col-2">Name</p>
            <p className="col-1">:</p>
            <p>{basicInformation?.firstName}</p>
          </div>
          <div className="overview-content d-flex justify-content-start">
            <p className="col-2">Company name</p>
            <p className="col-1">:</p>
            <p>{basicInformation?.companyName}</p>
          </div>
          <div className="overview-content d-flex justify-content-start">
            <p className="col-2">Email id</p>
            <p className="col-1">:</p>
            <p>{basicInformation?.emailId}</p>
          </div>
          <div className="overview-content d-flex justify-content-start">
            <p className="col-2">Mobile no</p>
            <p className="col-1">:</p>
            <p>{basicInformation?.Mobile}</p>
          </div>
          <div className="overview-content d-flex justify-content-start">
            <p className="col-2">Landline no</p>
            <p className="col-1">:</p>
            <p>{basicInformation?.landLine}</p>
          </div>
          <div className="overview-content d-flex justify-content-start">
            <p className="col-2">Website</p>
            <p className="col-1">:</p>
            <p className="text-primary cursor-pointer">
              <Link to={basicInformation?.website || "#"}>
                {basicInformation?.website}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerBasicInformation;
