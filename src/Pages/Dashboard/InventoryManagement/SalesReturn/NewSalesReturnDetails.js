import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { Menu, MenuItem, IconButton, Breadcrumbs } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import NewCreditNote from "../CreditNote/NewCreditNote";
import { useReactToPrint } from "react-to-print";
import { deleteSalesReturnBySalesReturnId } from "../../../../Redux/salesReturn/salesReturnSlice";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";

const NewSalesReturnDetails = ({ backToList, isChecked, returnData, openNewSalesReturn}) => {
  const [openMoreIcon, setOpenMoreIcon] = React.useState(null);
  const [openCreditNote, setOpenCreditNote] = useState(false);
  const openIcon = Boolean(openMoreIcon);
  const navigate = useNavigate();
  const componentRef = React.useRef(null);
  const dispatch = useDispatch();
  
    const handleAfterPrint = React.useCallback(() => {
        console.log("`onAfterPrint` called");
      }, []);
    
      const handleBeforePrint = React.useCallback(() => {
        console.log("`onBeforePrint` called");
        return Promise.resolve();
      }, []);
    
      const reactToPrintFn = useReactToPrint({
        contentRef: componentRef,
        documentTitle: "Package Details",
        onAfterPrint: handleAfterPrint,
        onBeforePrint: handleBeforePrint,
      });
  

  const handleClick = (event) => {
    if (event) {
      setOpenMoreIcon(event.currentTarget);
    }
  };

  const handleOpenNewCredit = () => {
    navigate("/admin/credit-note");
    setOpenCreditNote(true);
  }

  const handleDelete = () => {
      dispatch(deleteSalesReturnBySalesReturnId(returnData?.salesReturnId))
        .unwrap()
        .then((response) => {
          toast.success(response.message, {
            position: "top-center",
            autoClose: 2000,
            closeButton: false,
          });
          setTimeout(() => {
            openNewSalesReturn(false);
            setOpenMoreIcon(null);
          });
        })
        .catch((error) =>
          toast.error(error, {
            position: "top-center",
            autoClose: 2000,
            closeButton: false,
          })
        );
    };
  

  return (
    <div>
      {openCreditNote ? (
        <NewCreditNote backToList={() => setOpenCreditNote(false)} />
      ) : (
        <div className="purchase-list">
          <h2>New sales return</h2>
          <button onClick={backToList} className="goBack-btn">
            <span>
              <ArrowBackIosIcon />
            </span>
            Back
          </button>
          <div className="edit-print-del-btn mb-3">
            <div className="action-btn edit-btn">
              <EditOutlinedIcon className="action-icon" />
              Edit
            </div>
            <div className="divider"></div>
            <div className="action-btn print-btn" onClick={reactToPrintFn}>
              <PrintOutlinedIcon className="action-icon"/>
              Print
            </div>
            <div className="divider"></div>
            <div
              className="action-btn print-btn"
              onClick={handleOpenNewCredit}
            >
              Create credit note
            </div>
            <div className="divider"></div>
            <React.Fragment>
              <Menu
                anchorEl={openMoreIcon}
                open={openIcon}
                onClose={() => setOpenMoreIcon(null)}
                aria-labelledby="with-menu-demo-breadcrumbs"
              >
                <MenuItem onClick={handleDelete}>
                  Delete
                </MenuItem>
              </Menu>
              <Breadcrumbs aria-label="breadcrumbs">
                <IconButton
                  className="more-icon-btn"
                  size="large"
                  onClick={handleClick}
                >
                  <MoreVertOutlinedIcon />
                </IconButton>
              </Breadcrumbs>
            </React.Fragment>
            <div className="divider"></div>
          </div>
          <div className="sales-invoice-outer-card mt-5" ref={componentRef}>
            <p className="delivered-label">{returnData?.status}</p>
            <div className="sales-invoice-detail">
              <div className="sales-invoice">
                <div className="sales-invoice-heading mt-2">
                  <p>LOGO</p>
                  <p className="sales-id-text">xxxxxxxxxxxxx</p>
                  <p className="sales-id-text">xxxxxxxxxxxxx</p>
                </div>
                <div className="sales-order-date">
                  <p className="detail-heading mb-1 fw-bold">SALES RETURN</p>
                  <p className="sales-id-text">{returnData?.salesReturnId}</p>
                </div>
              </div>
              <div className="sales-invoice mt-4">
                <div className="mt-5">
                  <p>Customer</p>
                  <p>xxxxxxxxxxxx</p>
                  <p>xxxxxxxxxxxx</p>
                </div>
                <div className="sales-order-date me-5">
                <div className="d-flex mb-4">
                    <p>Refund Status - <span className="text-danger">Pending</span></p>
                  </div>
                  <div className="d-flex mb-3">
                    <p className="col-5">Date</p>
                    <p className="col-2">:</p>
                    <p className="col-6">{returnData?.salesReturnDate}</p>
                  </div>
                  <div className="d-flex mb-3">
                    <p className="col-5">SO#</p>
                    <p className="col-2">:</p>
                    <p className="col-6">{returnData?.salesOrderId}</p>
                  </div>
                  <div className="d-flex mb-3">
                    <p className="col-5">Invoice</p>
                    <p className="col-2">:</p>
                    <p className="col-6">{returnData?.invoiceNumber}</p>
                  </div>
                  <div className="d-flex">
                    <p className="col-5">Invoice date</p>
                    <p className="col-2">:</p>
                    <p className="col-6">{returnData?.invoiceDate}</p>
                  </div>
                </div>
              </div>
              <div className="row invoice-table mt-5">
                <Table className="table-content sales-invoice-table delivery-tableHeader">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th className="item-name-text">Item name</th>
                      <th>Reason</th>
                      {isChecked && <th>Returned</th>}
                      {isChecked && <th>Received</th>}
                      {isChecked && <th>Credit</th>}
                      {!isChecked && <th>Quantity</th>}
                      <th>Unit price</th>
                      <th>Total amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {returnData?.itemDetails.map((item, index) =>
                    <tr>
                    <td>{index + 1}</td>
                    <td className="item-name-text">{item.itemName}</td>
                    <td>{item.reason}</td>
                    {isChecked && <td>{item.returned}</td>}
                    {isChecked && <td>{item.receivableQty}</td>}
                    {isChecked && <td>{item.creditQty}</td>}
                    {!isChecked && <td>{item.returnQty}</td>}
                    <td>{item.unitPrice}</td>
                    <td>{(Number(item.returned) || 0) * (Number(item.unitPrice) || 0)}</td>
                  </tr> )}          
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default NewSalesReturnDetails;