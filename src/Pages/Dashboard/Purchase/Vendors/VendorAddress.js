import React, { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useSelector } from "react-redux";
import { CiCirclePlus } from "react-icons/ci";
import CreateNewAddress from "./CreateNewAddress";

const VendorAddress = () => {
  const { vendors } = useSelector((state) => state.vendor);
  const { billingAddress, shippingAddress } = vendors || {};
  const [address, setAddress] = useState(false);

  return (
    <div>
      {address ? (
        <CreateNewAddress vendors={vendors} />
      ) : (
        <div className="vendor-address-overview">
          <div className="vendor-address-left-content">
            <div className="fw-bold editWithBillingAddress">
              Billing address
              <span className="ms-1 add-billing-address">
                <EditOutlinedIcon onClick={() => setAddress(!address)}/>
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
              <div className="col-md-8">Country</div>
              <div className="col-md-2">-</div>
              <div className="col-md-8">{billingAddress?.country}</div>
            </div>
            <div className="vendor-content">
              <div className="col-md-8">State</div>
              <div className="col-md-2">-</div>
              <div className="col-md-8">{billingAddress?.state}</div>
            </div>
            <div className="vendor-content">
              <div className="col-md-8">City</div>
              <div className="col-md-2">-</div>
              <div className="col-md-8">{billingAddress?.city}</div>
            </div>
            <div className="vendor-content">
              <div className="col-md-8">Street</div>
              <div className="col-md-2">-</div>
              <div className="col-md-8">{billingAddress?.street}</div>
            </div>
            <div className="vendor-content">
              <div className="col-md-8">Zip code</div>
              <div className="col-md-2">-</div>
              <div className="col-md-8">{billingAddress?.zipCode}</div>
            </div>
            <div className="vendor-content">
              <div className="col-md-8">Phone no</div>
              <div className="col-md-2">-</div>
              <div className="col-md-8">{billingAddress?.phoneNo}</div>
            </div>
          </div>
          <div className="vertical-divider"></div>
          <div className="vendor-address-right-content">
            <div className="fw-bold editWithBillingAddress">
              Shipping address
              <span className="ms-1 add-billing-address">
                <EditOutlinedIcon onClick={() => setAddress(!address)}/>
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
              <div className="col-md-8">Country</div>
              <div className="col-md-2">-</div>
              <div className="col-md-8">{shippingAddress?.country}</div>
            </div>
            <div className="vendor-content">
              <div className="col-md-8">State</div>
              <div className="col-md-2">-</div>
              <div className="col-md-8">{shippingAddress?.state}</div>
            </div>
            <div className="vendor-content">
              <div className="col-md-8">City</div>
              <div className="col-md-2">-</div>
              <div className="col-md-8">{shippingAddress?.city}</div>
            </div>
            <div className="vendor-content">
              <div className="col-md-8">Street</div>
              <div className="col-md-2">-</div>
              <div className="col-md-8">{shippingAddress?.street}</div>
            </div>
            <div className="vendor-content">
              <div className="col-md-8">Zip code</div>
              <div className="col-md-2">-</div>
              <div className="col-md-8">{shippingAddress?.zipCode}</div>
            </div>
            <div className="vendor-content">
              <div className="col-md-8">Phone no</div>
              <div className="col-md-2">-</div>
              <div className="col-md-8">{shippingAddress?.phoneNo}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorAddress;
