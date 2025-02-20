import React, { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useSelector } from "react-redux";
import { CiCirclePlus } from "react-icons/ci";
import CreateNewCustomerAddress from "./CreateNewCustomerAddress";

const CustomerAddress = () => {
  const { customers } = useSelector((state) => state.customers);
  const { billingAddress, shippingAddress } = customers|| {};
  const [address, setAddress] = useState(false);

  return (
    <div>
      {address ? (
        <CreateNewCustomerAddress customers={customers} />
      ) : (
        <div className="vendor-address-overview">
          <div className="vendor-address-left-content">
            <div className="fw-bold">
              Billing address
              <span className="ms-1">
                <EditOutlinedIcon onClick={() => setAddress(!address)} />
                {!billingAddress && (
                  <div
                    class="add-billing-address-text"
                    onClick={() => setAddress(!address)}
                  >
                    <CiCirclePlus />
                    <span>Add Billing Address</span>
                  </div>
                )}
              </span>
            </div>
            <div className="vendor-content">
              <p className="col-md-5">Country</p>
              <p className="col-md-3">-</p>
              <p>{billingAddress?.country}</p>
            </div>
            <div className="vendor-content">
              <p className="col-md-5">State</p>
              <p className="col-md-3">-</p>
              <p>{billingAddress?.state}</p>
            </div>
            <div className="vendor-content">
              <p className="col-md-5">City</p>
              <p className="col-md-3">-</p>
              <p>{billingAddress?.city}</p>
            </div>
            <div className="vendor-content">
              <p className="col-md-5">Street</p>
              <p className="col-md-3">-</p>
              <p>{billingAddress?.street}</p>
            </div>
            <div className="vendor-content">
              <p className="col-md-5">Zip code</p>
              <p className="col-md-3">-</p>
              <p>{billingAddress?.zipCode}</p>
            </div>
            <div className="vendor-content">
              <p className="col-md-5">Phone no</p>
              <p className="col-md-3">-</p>
              <p>{billingAddress?.phoneNo}</p>
            </div>
          </div>
          <div className="vertical-divider"></div>
          <div className="vendor-address-right-content">
            <div className="fw-bold">
              Shipping address{" "}
              <span className="ms-1 add-billing-address">
                <EditOutlinedIcon onClick={() => setAddress(!address)} />
                {!billingAddress && (
                  <div
                    class="add-billing-address-text"
                    onClick={() => setAddress(!address)}
                  >
                    <CiCirclePlus />
                    <span>Add shipping Address</span>
                  </div>
                )}
              </span>
            </div>
            <div className="vendor-content">
              <p className="col-md-5">Country</p>
              <p className="col-md-3">-</p>
              <p>{shippingAddress?.country}</p>
            </div>
            <div className="vendor-content">
              <p className="col-md-5">State</p>
              <p className="col-md-3">-</p>
              <p>{shippingAddress?.state}</p>
            </div>
            <div className="vendor-content">
              <p className="col-md-5">City</p>
              <p className="col-md-3">-</p>
              <p>{shippingAddress?.city}</p>
            </div>
            <div className="vendor-content">
              <p className="col-md-5">Street</p>
              <p className="col-md-3">-</p>
              <p>{shippingAddress?.street}</p>
            </div>
            <div className="vendor-content">
              <p className="col-md-5">Zip code</p>
              <p className="col-md-3">-</p>
              <p>{shippingAddress?.zipCode}</p>
            </div>
            <div className="vendor-content">
              <p className="col-md-5">Phone no</p>
              <p className="col-md-3">-</p>
              <p>{shippingAddress?.phoneNo}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerAddress;
