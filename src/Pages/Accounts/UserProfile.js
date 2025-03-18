import React, { useEffect } from "react";
import AccountHeader from "../../assests/images/account-header.svg";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { data } = useSelector((state) => state.createAccount);
  const user = data?.data.user || {};

  useEffect(() => {}, [data]);
  return (
    <div>
      <div className="image-container">
        <img src={AccountHeader} className="employee-bg-header" />
        <div className="account-header">
          <div className="user-account-profile">
            <PersonIcon style={{ width: "50px", height: "50px" }} />
          </div>
          <div className="account-userid">
            <p className="fw-bold account-userid m-0">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="mt-1">User id: {user?._id}</p>
          </div>
        </div>
      </div>
      <div className="userProfile-info">
        <div>
          <div className="d-md-flex justify-content-between">
            <p className="fw-bold">Personal Information</p>
            <div className="userProfile-edit">
              <ModeEditOutlineOutlinedIcon />
              Edit
            </div>
          </div>
          <div className="col-md-7 user-content">
            <p className="col-md-2">Full name</p>
            <p className="col-md-1">:</p>
            <p className="col-md-2">
              {user?.firstName}.{user?.lastName}
            </p>
          </div>
          <div className="col-md-7 user-content">
            <p className="col-md-2">Display name</p>
            <p className="col-md-1">:</p>
            <p className="col-md-2">
              {user?.firstName}.{user?.lastName}
            </p>
          </div>
        </div>
        <hr />
        <div>
          <p className="fw-bold">Contact Details</p>
          <div className="col-md-7 user-content">
            <p className="col-md-2">Phone number</p>
            <p className="col-md-1">:</p>
            <p className="col-md-2">{user?.phoneNumber}</p>
          </div>
          <div className="col-md-7 user-content">
            <p className="col-md-2">Email Id</p>
            <p className="col-md-1">:</p>
            <p className="col-md-2">{user?.emailId}</p>
          </div>
        </div>
        <hr />
        <div>
          <p className="fw-bold">Location Details</p>
          <div className="col-md-7 user-content">
            <p className="col-md-2">Country</p>
            <p className="col-md-1">:</p>
            <p className="col-md-2">{user?.country}</p>
          </div>
          <div className="col-md-7 user-content">
            <p className="col-md-2">State</p>
            <p className="col-md-1">:</p>
            <p className="col-md-2">{user?.state}</p>
          </div>
          <div className="col-md-7 user-content">
            <p className="col-md-2">City</p>
            <p className="col-md-1">:</p>
            <p className="col-md-2">{user?.city}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
