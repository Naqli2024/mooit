import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import DeliveryChallanDetails from "./DeliveryChallanDetails";
import NewDeliveryChallan from "./NewDeliveryChallan";
const DeliveryChallans = () => {
    const [openChallanDetails, setChallanDetails] = useState(false);
         const [openNewChallan, setNewChallan] = useState(false);
         const handleNewChallan = () => {
           setNewChallan(true);
         };
         const handleChallanId = () => {
            setChallanDetails(true);
          };
          const backToList = () => {
            setChallanDetails(false);
            setNewChallan(false);
          };
  return (
    <div>
    {openChallanDetails ? (<DeliveryChallanDetails backToList={backToList}/>)
        :( openNewChallan ? (<NewDeliveryChallan backToList={backToList}/>) 
        :(
            <div className="purchase-list">
            <h2>Delivery Challans</h2>
            <div className="package-text-field">
              <div className="d-md-flex">
              </div>
              <button type="button" className="btn create-new-btn" onClick={handleNewChallan}>
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
                  <tr>
                    <td className="purchase-id" onClick={handleChallanId}>
                      BF-075868
                    </td>
                    <td>22/03/2024</td>
                    <td>Jake</td>
                    <td className="purchase-id">JH-657</td>
                    <td className="delivered-text">Delivered</td>
                    <td>Draft</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            </div>
        )  
        )
    }
    </div>
  )
}

export default DeliveryChallans