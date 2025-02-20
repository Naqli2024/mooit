import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { Menu, MenuItem, IconButton, Breadcrumbs, Link } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import { useDispatch, useSelector } from "react-redux";
import { getSaleOrderBySaleOrderId } from "../../../../Redux/salesOrder/getSaleOrderByIdSlice";
import { getShipmentDetails } from "../../../../Redux/shipment/shipmentSlice";
import { toast, ToastContainer } from "react-toastify";
import { deletedChallanBySaleOrderId } from "../../../../Redux/deliveryChallan/deliveryChallanSlice";

const DeliveryChallanDetails = ({ backToList, challan }) => {
  const [isDelivered, setIsDelivered] = useState(false);
  const [openMoreIcon, setMoreIcon] = React.useState(null);
  const [status, setStatus] = useState("Draft");
  const dispatch = useDispatch();
  const { saleOrderData } = useSelector(
    (state) => state.getSaleOrderBySaleOrderId
  );
  const { data } = useSelector((state) => state.shipment);
  const componentRef = React.useRef(null);

  //React-to-print functionalities
  const handleAfterPrint = React.useCallback(() => {
    console.log("`onAfterPrint` called");
  }, []);

  const handleBeforePrint = React.useCallback(() => {
    console.log("`onBeforePrint` called");
    return Promise.resolve();
  }, []);

  const reactToPrintFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Shipment Details",
    onAfterPrint: handleAfterPrint,
    onBeforePrint: handleBeforePrint,
  });

  const open = Boolean(openMoreIcon);
  const handleClick = (event) => {
    if (event) {
      setMoreIcon(event.currentTarget);
    }
  };
  const handleClose = () => {
    setMoreIcon(null);
  };

  const handleDelete = () => {
    dispatch(deletedChallanBySaleOrderId(challan.salesOrderId))
      .unwrap()
      .then((response) => {
        toast.success(response.message, {
          position: "top-center",
          autoClose: 2000,
          CloseButton: false,
        });
        setTimeout(() => backToList(), 2000);
        setMoreIcon(null);
      })
      .catch((error) => toast.error(error));
  };

  useEffect(() => {
    dispatch(getSaleOrderBySaleOrderId(challan?.salesOrderId));
    dispatch(getShipmentDetails(challan?.salesOrderId));
  }, [dispatch]);

  return (
    <div className="purchase-list">
      <h2>Delivery Challans</h2>
      <button onClick={backToList} className="goBack-btn">
        <span>
          <ArrowBackIosIcon />
        </span>
        Back
      </button>
      <div className="edit-print-del-btn">
        <div className="action-btn edit-btn">
          <EditOutlinedIcon className="action-icon" />
          Edit
        </div>
        <div className="divider"></div>
        <div className="action-btn print-btn" onClick={reactToPrintFn}>
          <PrintOutlinedIcon className="action-icon" />
          Print
        </div>
        <div className="divider"></div>
        <React.Fragment>
          <Menu
            anchorEl={openMoreIcon}
            open={open}
            onClose={handleClose}
            aria-labelledby="with-menu-demo-breadcrumbs"
          >
            <MenuItem onClick={handleClose}>Convert to Invoice</MenuItem>
            <MenuItem onClick={handleClose}>Reopen</MenuItem>
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
        <div
          className={
            status === "Approve"
              ? "challan-approve"
              : status === "Delivered"
              ? "delivered-label"
              : "package-label"
          }
        >
          {data && data?.data?.shipmentStatus}
        </div>
        <div className="sales-invoice-detail" ref={componentRef}>
          <div className="sales-invoice">
            <div className="sales-invoice-heading mt-2">
              <div>LOGO</div>
              <div className="sales-id-text">xxxxxxxxxxxxx</div>
              <div className="sales-id-text">xxxxxxxxxxxxx</div>
            </div>
            <div className="sales-order-date">
              <div className="detail-heading mb-1">Delivery Challan</div>
              <div className="sales-id-text">
                Challan number: {challan.deliveryChallan}
              </div>
            </div>
          </div>
          <div className="sales-invoice mt-5">
            <div className="sales-order-bill">
              <div>Bill to:</div>
              <div>xxxxxxxxxxxx</div>
              <div>xxxxxxxxxxxx</div>
            </div>
            <div className="sales-order-date mt-5">
              <div className="mb-2 me-4">
                Order date: {challan.deliveryChallanDate}
              </div>
            </div>
          </div>
          <div className="row invoice-table">
            <Table className="table-content sales-invoice-table delivery-tableHeader">
              <thead>
                <tr>
                  <th>#</th>
                  <th className="item-name-text">Item name</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>GST</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {challan?.itemDetails.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td className="item-name-text">{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>{item.discount}</td>
                    <td>{item.gst}%</td>
                    <td>{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="sales-invoice-bottom-content mb-3">
            <div className="sales-invoice-total col-4">
              <div className="">Sub total</div>
              <div className="col-2">{saleOrderData?.subTotal}</div>
            </div>
            <div className="sales-invoice-total col-4">
              <div className="">Shipping charges</div>
              <div className="col-2">{saleOrderData?.shipmentCharges}</div>
            </div>
            <hr className="amount-divider" />
            <div className="sales-invoice-total col-4">
              <div className="fw-bold">Total amount</div>
              <div className="fw-bold col-2">{saleOrderData?.total}</div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DeliveryChallanDetails;
