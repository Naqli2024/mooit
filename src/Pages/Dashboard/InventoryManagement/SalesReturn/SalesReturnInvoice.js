import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { Menu, MenuItem, IconButton, Breadcrumbs } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import Table from "react-bootstrap/Table";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { deleteSalesReturnBySalesReturnId } from "../../../../Redux/salesReturn/salesReturnSlice";
import { useReactToPrint } from "react-to-print";

const SalesReturnInvoice = ({ backToList, returnData }) => {
  const [openMoreIcon, setOpenMoreIcon] = React.useState(null);
  const openIcon = Boolean(openMoreIcon);
  const dispatch = useDispatch();
  const componentRef = React.useRef(null);

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
    setOpenMoreIcon(event.currentTarget);
  };

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
          backToList();
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
    <div className="purchase-list">
      <h2>{returnData?.salesReturnId}</h2>
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
        <div className="action-btn print-btn">
          <PrintOutlinedIcon className="action-icon" onClick={reactToPrintFn}/>
          Print
        </div>
        <div className="divider"></div>
        <React.Fragment>
          <Menu
            anchorEl={openMoreIcon}
            open={openIcon}
            onClose={() => setOpenMoreIcon(null)}
            aria-labelledby="with-menu-demo-breadcrumbs"
          >
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
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
      <div className="sales-invoice-outer-card mt-5">
        <div className="sales-invoice-detail" ref={componentRef}>
          <div className="sales-invoice">
            <div className="sales-invoice-heading mt-2">
              <p className="detail-heading mb-1 fw-bold">
                Sales return
                <span className="ms-2 closed-label">{returnData?.status}</span>
              </p>
              <p className="sales-id-text">{returnData?.salesReturnId}</p>
            </div>
          </div>
          <div className="sales-invoice mt-5">
            <div className="mb-5 d-flex flex-column gap-2">
              <p>Date: {returnData?.salesReturnDate}</p>
              <p>Reason: {returnData?.itemDetails?.map(item => item.reason).join(", ")}</p>
            </div>
            <div className="sales-order-date d-flex flex-column gap-2">
              <p>
                status<span className="refunded-text">{returnData?.status}</span>
              </p>
              <p>
                Refund status<span className="refunded-text"></span>
              </p>
            </div>
          </div>
          <div className="row invoice-table mt-3">
            <Table className="table-content sales-invoice-table delivery-tableHeader">
              <thead>
                <tr>
                  <th>#</th>
                  <th className="item-name-text">Item name</th>
                  <th>Quantity</th>
                  <th>Rate</th>
                </tr>
              </thead>
              <tbody>
                {returnData?.itemDetails?.map((item, index) => 
                <tr>
                <td>{index + 1}</td>
                <td className="item-name-text">{item.itemName}</td>
                <td>{item.returned}</td>
                <td>{""}</td>
              </tr>)}               
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SalesReturnInvoice;
