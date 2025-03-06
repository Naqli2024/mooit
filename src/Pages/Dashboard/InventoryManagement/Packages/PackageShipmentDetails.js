import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { Menu, MenuItem, IconButton, Breadcrumbs, Link } from "@mui/material";
import { Table } from "react-bootstrap";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteShipmentByShipmentOrder,
  getShipmentDetails,
  updateShipmentStatus,
} from "../../../../Redux/shipment/shipmentSlice";
import { getSaleOrderBySaleOrderId } from "../../../../Redux/salesOrder/getSaleOrderByIdSlice";
import { toast, ToastContainer } from "react-toastify";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const PackageShipmentDetails = ({ backToList, shipmentData }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [updateStatus, setUpdateStatus] = useState(false);
  const [openMoreIcon, setMoreIcon] = React.useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.shipment);
  const { saleOrderData } = useSelector(
    (state) => state.getSaleOrderBySaleOrderId
  );
  const openIcon = Boolean(openMoreIcon);
  const [status, setStatus] = React.useState("");
  const navigate = useNavigate();
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

  const handleUpdate = () => {
    handleClose();
    const payload = {
      shipmentStatus: status,
      deliveredDate: date,
      deliveredTime: time,
      salesOrderId: data?.data.salesOrderId,
      shipmentOrder: data?.data.shipmentOrder,
    };
    dispatch(updateShipmentStatus(payload))
      .unwrap()
      .then((response) => {
        toast.success(response.message, {
          position: "top-center",
          autoClose: 1000,
          closeButton: false,
        });
        setUpdateStatus(true);
        setTimeout(() => {navigate('/admin/packages')},1000)
      })
      .catch((error) =>
        toast.error(error, {
          position: "top-center",
          autoClose: 1000,
          closeButton: false,
        })
      );
  };

  const handleClick = (event) => {
    if (event) {
      setMoreIcon(event.currentTarget);
    }
  };

  const handleIconClose = () => {
    setMoreIcon(null);
  };

  const handleShipmentDelete = () => {
    dispatch(deleteShipmentByShipmentOrder(data?.data.shipmentOrder))
      .unwrap()
      .then((response) => {
        toast.success(response.message, {
          position: "top-center",
          autoClose: 1000,
          closeButton: false,
        });
        setTimeout(() => {
          setMoreIcon(null);
          backToList();
        }, 1000);
      })
      .catch((error) =>
        toast.error(error, {
          position: "top-center",
          autoClose: 1000,
          closeButton: false,
        })
      );
  };

  const totalQty = saleOrderData?.itemDetails.reduce(
    (item, saleOrderQty) => item + saleOrderQty.quantity,
    0
  );

  useEffect(() => {
    if (shipmentData) {
      dispatch(getShipmentDetails(shipmentData.salesOrderId));
      dispatch(getSaleOrderBySaleOrderId(shipmentData.salesOrderId));
    }
  }, [dispatch]);

  return (
    <div className="purchase-list">
      <h2>{data?.data.packageSlip}</h2>
      <button onClick={backToList} className="goBack-btn">
        <span>
          <ArrowBackIosIcon />
        </span>
        Back
      </button>
      <div className="edit-print-del-btn mt-3">
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
        <div className="action-btn print-btn" onClick={handleOpen}>
          {updateStatus ? "Update status" : "Set as delivered"}
        </div>
        <div className="divider"></div>
        <React.Fragment>
          <Menu
            anchorEl={openMoreIcon}
            open={openIcon}
            onClose={handleIconClose}
            aria-labelledby="with-menu-demo-breadcrumbs"
          >
            <MenuItem onClick={handleShipmentDelete}>Delete</MenuItem>
          </Menu>
          <Breadcrumbs aria-label="breadcrumbs">
            <IconButton size="small" onClick={handleClick}>
              <MoreVertOutlinedIcon />
            </IconButton>
          </Breadcrumbs>
        </React.Fragment>
        <div className="divider"></div>
      </div>
      <div className="package-shipment-details package-top-heading" ref={componentRef}>
        <div className="ms-5 package-order-date">
          <span className="fw-bold">Shipment order: </span>
          {data?.data.shipmentOrder}
        </div>
        <div>
          <span className="fw-bold">Shipment date: </span>
          {data?.data.shipmentDate}
        </div>
        <div className="me-5">
          <span className="fw-bold">Carrier: </span>
          {data?.data.carrier}
        </div>
      </div>
      <div className="sales-invoice-outer-card">
        <div className={updateStatus ? "delivered-label" : "shipped-label"}>
          {data?.data.shipmentStatus}
        </div>
        <div className="sales-invoice-detail">
          <div className="sales-invoice">
            <div className="sales-invoice-heading mt-2">
              <div>LOGO</div>
              <div className="sales-id-text">xxxxxxxxxxxxx</div>
              <div className="sales-id-text">xxxxxxxxxxxxx</div>
            </div>
            <div className="sales-order-date">
              <div className="detail-heading mb-1">Package</div>
              <div className="sales-id-text">
                Package id: {data?.data.packageSlip}
              </div>
            </div>
          </div>
          <div className="shipments-carrier mt-5">
            <div className="package-order-date">
              Order date: {saleOrderData?.salesorderDate}
            </div>
            <div>Sales order: {data?.data.salesOrderId}</div>
            <div>Total quantity: {totalQty}</div>
          </div>
          <div className="sales-invoice">
            <div className="sales-order-bill">
              <div>Bill to:</div>
              <div>xxxxxxxxxxxx</div>
              <div>xxxxxxxxxxxx</div>
            </div>
          </div>
          <div className="row invoice-table">
            <Table className="table-content sales-invoice-table delivery-tableHeader">
              <thead>
                <tr>
                  <th>#</th>
                  <th className="item-name-text">Item name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>GST</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {saleOrderData?.itemDetails &&
                  saleOrderData.itemDetails.map((item, index) => (
                    <tr key={index}>
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
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            width: "400px",
          },
        }}
      >
        <DialogTitle className="purchase-list" sx={{ padding: 0 }}>
          <h2>Set as Delivered</h2>
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <Form.Label className="custom-label">Status</Form.Label>
            <Select
              labelId="delivery-type-label"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              sx={{
                height: 48,
                width: "100%",
              }}
            >
              <MenuItem value="">
                {" "}
                <em>None</em>{" "}
              </MenuItem>
              <MenuItem value="In-Transit">In-Transit</MenuItem>
              <MenuItem value="Out For Delivery">Out For Delivery</MenuItem>
              <MenuItem value="Failed Delivery Attempt">
                Failed Delivery Attempt
              </MenuItem>
              <MenuItem value="Shipped">Shipped</MenuItem>
              <MenuItem value="Customs Clearance">Customs Clearance</MenuItem>
              <MenuItem value="Ready For Pickup">Ready For Pickup</MenuItem>
              <MenuItem value="Delayed">Delayed</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Delivered Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <TextField
            label="Delivered Time"
            type="time"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </DialogContent>

        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "8px",
            padding: "16px",
          }}
        >
          <Button
            onClick={handleUpdate}
            variant="contained"
            sx={{
              backgroundColor: "#1F3F7F",
              color: "#fff",
              fontWeight: "normal",
            }}
          >
            Confirm
          </Button>
          <Button
            onClick={handleClose}
            sx={{
              border: "1px solid #ddd",
              color: "black",
              fontWeight: "normal",
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  );
};

export default PackageShipmentDetails;
