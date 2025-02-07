import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import DeliveryChallanDetails from "./DeliveryChallanDetails";
import NewDeliveryChallan from "./NewDeliveryChallan";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../Helper/Loader";
import { getAllChallans } from "../../../../Redux/deliveryChallan/deliveryChallanSlice";

const DeliveryChallans = () => {
  const [openChallanDetails, setChallanDetails] = useState(false);
  const [openNewChallan, setNewChallan] = useState(false);
  const dispatch = useDispatch();
  const { loading, challan } = useSelector((state) => state.deliveryChallan);
  const [selectedChallan, setSelectedChallan] = useState({});

  const handleNewChallan = () => {
    setNewChallan(true);
  };

  const handleChallanId = (challanData) => {
    setChallanDetails(true);
    setSelectedChallan(challanData)
  };

  const backToList = () => {
    setChallanDetails(false);
    setNewChallan(false);
  };

  useEffect(() => {
    dispatch(getAllChallans());
  }, [dispatch, challan]);

  return (
    <div>
      {loading && <Loader />}
      {openChallanDetails ? (
        <DeliveryChallanDetails backToList={backToList} challan={selectedChallan}/>
      ) : openNewChallan ? (
        <NewDeliveryChallan backToList={backToList} />
      ) : (
        <div className="purchase-list">
          <h2>Delivery Challans</h2>
          <div className="package-text-field">
            <div className="d-md-flex"></div>
            <button
              type="button"
              className="btn create-new-btn"
              onClick={handleNewChallan}
            >
              New Challan
            </button>
          </div>
          <div className="table-container mx-5">
            <Table bordered className="custom-table sales-in-outbound-table">
              <thead>
                <tr>
                  <th>Challan number</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Sales order no</th>
                  <th>Status</th>
                  <th>Invoice Status</th>
                </tr>
              </thead>
              <tbody>
                {challan?.length > 0 ? challan.map((challanData) => 
                <tr>
                  <td className="purchase-id" onClick={() => handleChallanId(challanData)}>
                    {challanData.deliveryChallan}
                  </td>
                  <td>{challanData.deliveryChallanDate}</td>
                  <td>{challanData.customerName}</td>
                  <td className="purchase-id">{challanData.salesOrderId}</td>
                  <td className="delivered-text"></td>
                  <td></td>
                </tr>
                ): <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No challan data available.
                </td>
              </tr>}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryChallans;
