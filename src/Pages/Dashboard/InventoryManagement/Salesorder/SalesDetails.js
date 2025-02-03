import React, { useState, useEffect } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import Form from "react-bootstrap/Form";
import Switch from "@mui/material/Switch";
import { Menu, MenuItem, IconButton, Breadcrumbs } from "@mui/material";
import Table from "react-bootstrap/Table";
import SalesDetailsPdfView from "./SalesDetailsPdfView";
import { useReactToPrint } from "react-to-print";
import { useDispatch, useSelector } from "react-redux";
import { updateSaleOrderStatus } from "../../../../Redux/salesOrder/updateSaleOrderStatus";
import SalesPackage from "./SalesPackage";
import { deleteSaleOrderById } from "../../../../Redux/salesOrder/deleteSaleOrderById";
import { getAllSalesOrder } from "../../../../Redux/salesOrder/getSaleOrder";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SalesDetails = ({ backToList, saleOrderData }) => {
  const [openMoreIcon, setMoreIcon] = React.useState(null);
  const [isPdfViewEnabled, setIsPdfViewEnabled] = useState(false);
  const [status, setStatus] = useState("Draft");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const componentRef = React.useRef(null);
  const dispatch = useDispatch();
  const [openCreate, setCreate] = React.useState(null);
  const [openSalesPackage, setOpenSalesPackage] = useState(false);

  const handleAfterPrint = React.useCallback(() => {
    console.log("`onAfterPrint` called");
  }, []);

  const handleBeforePrint = React.useCallback(() => {
    console.log("`onBeforePrint` called");
    return Promise.resolve();
  }, []);

  const reactToPrintFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Sales Details",
    onAfterPrint: handleAfterPrint,
    onBeforePrint: handleBeforePrint,
  });

  const handleStatusChange = (event) => {
    if (status !== "Closed") {
      const payload = {
        salesOrderId: saleOrderData?.salesOrderId,
        status: event.target.value,
      };
      dispatch(updateSaleOrderStatus(payload))
        .unwrap()
        .then((response) => {
          if (response) {
            setStatus(response.status?.value);
            toast.success(response.message, {
              position: "top-center",
              autoClose: 3000,
            });
          }
        });
    } else {
      toast.error("Cannot Update! Sale Order Closed!", {
        position: "top-center",
        closeButton: false,
        autoClose: 2000,
      });
    }
  };

  const handleSwitchChange = (event) => {
    setIsPdfViewEnabled(event.target.checked);
  };

  const open = Boolean(openMoreIcon);
  const handleClick = (event) => {
    if (event) {
      setMoreIcon(event.currentTarget);
    }
  };

  const handleVoid = () => {
    setMoreIcon(null);
    const payload = {
      salesOrderId: saleOrderData?.salesOrderId,
      status: "Void",
    }
    dispatch(updateSaleOrderStatus(payload))
      .unwrap()
      .then((response) => {
        if (response) {
          setStatus(response.status?.value);
          toast.success("Sale order status updated successfully", {
            position: "top-center",
            autoClose: 3000,
          });
          // backToList();
        }
      });
  };

  const handleClosed = (newStatus) => {
    setMoreIcon(null);
    const payload = {
      salesOrderId: saleOrderData?.salesOrderId,
      status: newStatus,
    };
    dispatch(updateSaleOrderStatus(payload))
      .unwrap()
      .then((response) => {
        if (response) {
          setStatus(response.status?.value);
          const toastMessage =
          newStatus === "Closed" ? "Sale order closed" : "Sale order reopened";
          toast.success(toastMessage, {
            position: "top-center",
            autoClose: 3000,
          });
        }
      });
  };

  const handleDelete = () => {
    setMoreIcon(null);
    if (saleOrderData) {
      dispatch(deleteSaleOrderById(saleOrderData?._id))
        .unwrap()
        .then((response) => {
          toast.success(response?.message, {
            position: "top-center",
            autoClose: 3000,
          });
          backToList();
          dispatch(getAllSalesOrder());
        })
        .catch((error) => {
          toast.error(error?.message, {
            position: "top-center",
            autoClose: 3000,
          });
        });
    }
  };

  const handleConfirm = () => {
    const payload = {
      salesOrderId: saleOrderData?.salesOrderId,
      status: "Confirmed",
    };
    dispatch(updateSaleOrderStatus(payload))
      .unwrap()
      .then((response) => {
        if (response) {
          setStatus(response.status?.value);
          toast.success("Sale order confirmed", {
            position: "top-center",
            autoClose: 3000,
          });
        }
      });
    setIsConfirmed(true);
  };

  const clickCreate = Boolean(openCreate);
  const handleCreateClick = (event) => {
    if (event) {
      setCreate(event.currentTarget);
    }
  };
  const handleCreateClose = () => {
    setOpenSalesPackage(true);
    setCreate(null);
  };

  useEffect(() => {
    if (saleOrderData?.status?.value) {
      setStatus(saleOrderData.status.value);
    }
  }, [saleOrderData]);

  return (
    <>
      {openSalesPackage ? (
        <SalesPackage
          backToList={() => setOpenSalesPackage(!setOpenSalesPackage)}
        />
      ) : (
        <div>
          <h2>Sales Order</h2>
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
            {!(status === "Confirmed" || status === "Void") && (
              <>
                {status === "Approved" ? (
                  <div className="sales-id-text ms-2 me-2" onClick={handleConfirm}>
                    Confirm Order
                  </div>
                ) : (
                  <Form.Select
                    aria-label="Default select example"
                    className="salesOrder-dropdown-style"
                    defaultValue="status"
                    onChange={handleStatusChange}
                  >
                    <option value="status" disabled>
                      Status
                    </option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </Form.Select>
                )}
                <div className="divider"></div>
              </>
            )}
            <React.Fragment>
              <Menu
                anchorEl={openCreate}
                open={clickCreate}
                onClose={handleCreateClose}
                aria-labelledby="with-menu-demo-breadcrumbs"
              >
                <MenuItem>Invoice</MenuItem>
                <MenuItem onClick={handleCreateClose}>Package</MenuItem>
              </Menu>
              <Breadcrumbs aria-label="breadcrumbs">
                <div
                  onClick={handleCreateClick}
                  className="text-dark create-text ms-2 me-2"
                >
                  Create
                </div>
              </Breadcrumbs>
            </React.Fragment>
            <div className="divider"></div>
            {!(status === "Confirmed" || status === "Void") && (
              <>
                <React.Fragment>
                  <Menu
                    anchorEl={openMoreIcon}
                    open={open}
                    onClose={()=> setMoreIcon(null)}
                    aria-labelledby="with-menu-demo-breadcrumbs"
                  >
                    <MenuItem onClick={() => handleClosed(status === "Closed" ? "Draft" : "Closed")}>
                    {status === "Closed"
                        ? "Reopen"
                        : "Closed"}
                    </MenuItem>
                    <MenuItem onClick={handleVoid}>Void</MenuItem>
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                  </Menu>
                  <Breadcrumbs aria-label="breadcrumbs">
                    <IconButton size="small" onClick={handleClick}>
                      <MoreVertOutlinedIcon />
                    </IconButton>
                  </Breadcrumbs>
                </React.Fragment>
                <div className="divider"></div>
              </>
            )}
          </div>
          <div className="pdf-switch">
            <Switch
              checked={isPdfViewEnabled}
              onChange={handleSwitchChange}
              onClick={(e) => e.stopPropagation()}
            />
            <span style={{ fontSize: "14px", marginRight: "30px" }}>
              Pdf View
            </span>
          </div>
          {isPdfViewEnabled ? (
            <SalesDetailsPdfView
              status={status}
              saleOrderData={saleOrderData}
              ref={componentRef}
            />
          ) : (
            <div className="create-invoice-outer-card sales-invoice-outer-card">
              <div ref={componentRef} className="sales-invoice-detail">
                <div className="sales-invoice">
                  <div className="sales-invoice-heading">
                    <div className="fw-bold fs-5">
                      Sales Order
                      <span
                        className={
                          status === "Approved"
                            ? "approve-text"
                            : status === "Confirmed"
                            ? "confirm-text"
                            : "draft-text"
                        }
                      >
                        {status}
                      </span>
                    </div>
                    <div className="sales-id-text">
                      Sales order #{saleOrderData?.salesOrderId}
                    </div>
                  </div>
                  <div className="sales-order-date">
                    <div className="mb-2">
                      Order date: {saleOrderData?.salesorderDate}
                    </div>
                    <div className="mb-2">
                      Shipment date: {saleOrderData?.shipmentDate}
                    </div>
                    <div className="mb-2">
                      Payment terms: {saleOrderData?.paymentTerms}
                    </div>
                    <div className="mb-2">
                      Sales person: {saleOrderData?.salesPerson}
                    </div>
                  </div>
                </div>
                <div className="sales-invoice">
                  <div className="sales-order-bill">
                    <div>Bill to</div>
                    <div>xxxxxxxxxxxx</div>
                    <div>xxxxxxxxxxxx</div>
                  </div>
                  <div className="sales-order-ship">
                    <div className="mb-2">Ship to</div>
                    <div>xxxxxxxxxxxxxxxxxxxxx</div>
                    <div>xxxxxxxxxxxxxxxxxxxxx</div>
                  </div>
                </div>
                <div className="row invoice-table">
                  <Table className="table-content sales-invoice-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Item name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>GST</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {saleOrderData?.itemDetails.map((items, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{items.name}</td>
                          <td>{items.quantity}</td>
                          <td>{items.price}</td>
                          <td>{items.discount}</td>
                          <td>{items.gst}</td>
                          <td>{items.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                <div className="sales-invoice-bottom-content">
                  <div className="sales-invoice-total col-4">
                    <div className="">Sub total</div>
                    <div className="col-2">{saleOrderData?.subTotal}</div>
                  </div>
                  <div className="sales-invoice-total col-4">
                    <div className="">Shipping charges</div>
                    <div className="col-2">
                      {saleOrderData?.shipmentCharges}
                    </div>
                  </div>
                  <hr className="amount-divider" />
                  <div className="sales-invoice-total col-4">
                    <div className="fw-bold">Total amount</div>
                    <div className="fw-bold col-2">{saleOrderData?.total}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SalesDetails;
