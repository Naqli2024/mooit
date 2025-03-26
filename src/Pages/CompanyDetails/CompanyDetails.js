import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import xLogo from "../../assests/images/companyX.svg";
import Facebook from "../../assests/images/comapanyFb.svg";
import Linkedin from "../../assests/images/companyLinkedIn.svg";
import Instagram from "../../assests/images/insta-logo.svg";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

const CompanyDetails = ({backToList}) => {
  return (
    <div>
      <div className="company-detail-profile">
        <div className="user-account-profile">
          <PersonIcon style={{ width: "50px", height: "50px" }} />
        </div>
        <div>
          <p className="fw-bold mb-2">Nexelisium</p>
          <p className="text-secondary">Company Id : 898539859859</p>
        </div>
      </div>
      <div className="user-company-details">
        <div className="d-md-flex justify-content-between">
          <p className="fw-bold">Profile Information</p>
          <div className="userProfile-edit" onClick={backToList}>
            <ModeEditOutlineOutlinedIcon />
            Edit
          </div>
        </div>
        <div className="col-md-7 user-content">
          <p className="col-md-3">Company name</p>
          <p className="col-md-1 hide-on-small">:</p>
          <p className="col-md-4 text-dark">Nexelisium</p>
        </div>
        <div className="col-md-7 user-content">
          <p className="col-md-3">Company type</p>
          <p className="col-md-1 hide-on-small">:</p>
          <p className="col-md-4 text-dark">Construction</p>
        </div>
        <div className="col-md-7 user-content">
          <p className="col-md-3">Website</p>
          <p className="col-md-1 hide-on-small">:</p>
          <p className="col-md-4 text-primary">www.nexelisium.com</p>
        </div>
      </div>
      <hr />
      <div className="user-company-details">
        <p className="fw-bold">Company Location</p>
        <div className="col-md-7 user-content">
          <p className="col-md-3">Country</p>
          <p className="col-md-1 hide-on-small">:</p>
          <p className="col-md-4 text-dark">India</p>
        </div>
        <div className="col-md-7 user-content">
          <p className="col-md-3">State</p>
          <p className="col-md-1 hide-on-small">:</p>
          <p className="col-md-4 text-dark">Tamilnadu</p>
        </div>
        <div className="col-md-7 user-content">
          <p className="col-md-3">City</p>
          <p className="col-md-1 hide-on-small">:</p>
          <p className="col-md-4 text-dark">Coimbatore</p>
        </div>
      </div>
      <hr />
      <div className="user-company-details">
        <p className="fw-bold">Company Address</p>
        <div className="col-md-7 user-content">
          <p className="col-md-3">Street name 1</p>
          <p className="col-md-1 hide-on-small">:</p>
          <p className="col-md-4 text-dark">North street</p>
        </div>
        <div className="col-md-7 user-content">
          <p className="col-md-3">Street name 2</p>
          <p className="col-md-1 hide-on-small">:</p>
          <p className="col-md-4 text-dark">North Street</p>
        </div>
        <div className="col-md-7 user-content">
          <p className="col-md-3">Zip code</p>
          <p className="col-md-1 hide-on-small">:</p>
          <p className="col-md-4 text-dark">631027</p>
        </div>
        <div className="col-md-7 user-content">
          <p className="col-md-3">Fax number</p>
          <p className="col-md-1 hide-on-small">:</p>
          <p className="col-md-4 text-dark">213-232-4343</p>
        </div>
        <div className="col-md-7 user-content">
          <p className="col-md-3">Mobile number</p>
          <p className="col-md-1 hide-on-small">:</p>
          <p className="col-md-4 text-dark">95343412312</p>
        </div>
      </div>
      <div className="user-password">
        <p className="fw-bold">Social media links</p>
        <div className="d-flex align-items-center gap-4">
          <img src={xLogo} alt="x-logo" className="cursor-pointer" />
          <img src={Facebook} alt="fb-logo" className="cursor-pointer" />
          <img src={Linkedin} alt="linkedIn-logo" className="cursor-pointer" />
          <img
            src={Instagram}
            alt="instagram-logo"
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
