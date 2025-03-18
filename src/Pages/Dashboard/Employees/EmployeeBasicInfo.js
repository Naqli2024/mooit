import React from "react";
import { TfiEmail } from "react-icons/tfi";
import { MdPhoneAndroid } from "react-icons/md";
import { TbGenderMale } from "react-icons/tb";
import { VscPerson } from "react-icons/vsc";
import { useSelector } from "react-redux";
import Loader from "../../../Helper/Loader";

const EmployeeBasicInfo = ({ employee }) => {
  const { loading } = useSelector((state) => state.employee);

  return (
    <>
      {loading && <Loader />}
      <div className="emp-overview">
        <div className="col-md-7 overview-left-content">
          <div className="emp-content">
            <p className="col-md-4">
              <span className="emp-info-icon">
                <TfiEmail />
              </span>
              Email
            </p>
            <p className="col-md-1">-</p>
            <p className="col-md-5">{employee?.emailId}</p>
          </div>
          <div className="emp-content">
            <p className="col-md-4">
              <span className="emp-info-icon">
                <MdPhoneAndroid />
              </span>
              Mobile no
            </p>
            <p className="col-md-1">-</p>
            <p className="col-md-5">+91 {employee?.mobileNo}</p>
          </div>
          <div className="emp-content">
            <p className="col-md-4">
              <span className="emp-info-icon">
                <TbGenderMale />
              </span>
              Gender
            </p>
            <p className="col-md-1">-</p>
            <p className="col-md-5">{employee?.gender}</p>
          </div>
          <div className="emp-content">
            <p className="col-md-4">
              <span className="emp-info-icon">
                <VscPerson />
              </span>
              Age
            </p>
            <p className="col-md-1">-</p>
            <p className="col-md-5">{employee?.age}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeBasicInfo;
