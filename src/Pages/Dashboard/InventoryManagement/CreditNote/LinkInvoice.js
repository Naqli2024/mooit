import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Table from "react-bootstrap/Table";
import LinkInvoiceDetails from "./LinkInvoiceDetails";
import { useDispatch } from "react-redux";
import { getCustomerDetailsByName } from "../../../../Redux/customer/customerSlice";
import { toast, ToastContainer } from "react-toastify";
import { editSalesInvoice, updateInvoiceWithCredits } from "../../../../Redux/salesInvoiceSlice/salesInvoice";

const LinkInvoice = ({ backToList, creditNoteData }) => {
  const [openLinkToInvoiceDetails, setOpenLinkToInvoiceDetails] =
    useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState();
  const dispatch = useDispatch();
  const [amountToCredit, setAmountToCredit] = useState(0);
  const [amounts, setAmounts] = useState([]);
  const creditBalance = invoiceDetails?.creditBalance || 0;
  // Calculate "Amount to Credit" total
  const amountToCreditTotal = amounts.reduce((sum, val) => sum + val, 0);

  // Calculate "Remaining Credit"
  const remainingCredit = creditBalance - amountToCreditTotal;

  const handleSubmit = () => {
    if (!invoiceDetails?.salesList) return;
  
    const payload = invoiceDetails.salesList
      .map((item, index) => {
        const creditAmount = amounts?.[index] || 0; 
        if (creditAmount > 0) {
          return {
            invoiceId: item.invoiceId, 
            invoiceCorrected: true,
            creditsUsed: creditAmount, 
          };
        }
        return null; 
      })
      .filter(entry => entry !== null); 

    dispatch(updateInvoiceWithCredits(payload)) 
    .unwrap()
    .then((response)=> {
      toast.success(response.message, {position: "top-center",autoClose: 2000, closeButton: false});
      setTimeout(() => setOpenLinkToInvoiceDetails(true), 2000)
    })
    .catch((error) => toast.error(error))
  };

  const handleAmountChange = (index, value) => {
    const newAmounts = [...amounts];
    newAmounts[index] = parseFloat(value) || 0;
    setAmounts(newAmounts);
  };

  useEffect(() => {
    const payload = {
      customerName: creditNoteData?.customerName,
      companyName: creditNoteData?.companyName,
    };
    dispatch(getCustomerDetailsByName(payload))
      .unwrap()
      .then((response) => setInvoiceDetails(response));
  });

  return (
    <div>
      {openLinkToInvoiceDetails ? (
        <LinkInvoiceDetails
          backToList={() => setOpenLinkToInvoiceDetails(false)}
        />
      ) : (
        <div className="purchase-list">
          <h2>Draw credit from {creditNoteData?.creditNoteId}</h2>
          <div className="link-invoice">
            <button onClick={backToList} className="goBack-btn ms-0">
              <span>
                <ArrowBackIosIcon />
              </span>
              Back
            </button>
            <div className="d-flex justify-content-end me-3">
              <p>
                Total credit: <span className="fw-bold">{creditBalance}</span>
              </p>
            </div>
            <div className="table-container">
              <Table
                bordered
                className="custom-table sales-in-outbound-table delivery-tableHeader"
              >
                <thead>
                  <tr>
                    <th>Invoice no</th>
                    <th>Invoice date</th>
                    <th>Invoice amount</th>
                    <th className="amount-credit">Amount to credit</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceDetails?.paymentStatus !== "Paid" &&
                  Array.isArray(invoiceDetails?.salesList) &&
                  invoiceDetails.salesList.length > 0 ? (
                    invoiceDetails.salesList.map((item, index) => (
                      <tr key={index}>
                        <td>{item.invoiceId}</td>
                        <td>{item.invoiceDate}</td>
                        <td>{item.totalAmount}</td>
                        <td className="text-center">
                          <input
                            type="text"
                            className="mx-auto text-end d-inline-block"
                            value={amounts?.[index] || ""}
                            onChange={(e) =>
                              handleAmountChange(index, e.target.value)
                            }
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center">
                        No Invoice Available
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
            <div className="sales-invoice-bottom-content mb-5 me-0 me-3 d-flex justify-content-end mb-3">
              <div className="sales-invoice-total col-md-4 gap-2">
                <p className="">Amount to credit</p>
                <p className="col-md-2 fw-bold ms-2">
                  {amountToCreditTotal.toFixed(2)}
                </p>
              </div>
              <div className="remaining-credit col-md-4 gap-2">
                <p className="">Remaining credit</p>
                <p className="col-md-2 fw-bold">{remainingCredit.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row justify-content-center p-3">
              <div className="col-12 col-md-3 d-flex justify-content-between gap-2">
                <button
                  type="submit"
                  className="btn flex-grow-1"
                  style={{ color: "white", backgroundColor: "#1F3F7F" }}
                  onClick={handleSubmit}
                >
                  Save
                </button>
                <button
                  className="btn btn-danger flex-grow-1"
                  onClick={backToList}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default LinkInvoice;
