import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import Table from "react-bootstrap/Table";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Menu, MenuItem, IconButton, Breadcrumbs, Link } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Form } from "react-bootstrap";
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
import { toast } from "react-toastify";
import { getSaleOrderBySaleOrderId } from "../../../../Redux/salesOrder/getSaleOrderByIdSlice";
import { getPackageDetails } from "../../../../Redux/package/getPackageDetails";
import { useReactToPrint } from "react-to-print";

const ShipmentDetails = ({ backToList, newShipmentData }) => {
  const [openMoreIcon, setMoreIcon] = React.useState(null);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [status, setStatus] = React.useState("");
  const openIcon = Boolean(openMoreIcon);
  const { saleOrderData } = useSelector(
    (state) => state.getSaleOrderBySaleOrderId
  );
  const { packageDetail } = useSelector((state) => state.getPackageDetails);
  const dispatch = useDispatch();
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

  const handleClick = (event) => {
    if (event) {
      setMoreIcon(event.currentTarget);
    }
  };

  const handleIconClose = () => {
    setMoreIcon(null);
  };

  const handleUpdate = () => {
    const payload = {
      shipmentStatus: status,
      deliveredDate: date,
      deliveredTime: time,
      salesOrderId: newShipmentData?.salesOrderId,
      shipmentOrder: newShipmentData?.shipmentOrder,
    };
    dispatch(updateShipmentStatus(payload))
      .unwrap()
      .then((response) => {
        toast.dismiss();
        toast.success(response?.message, {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
        });
        setUpdateStatus(true);
        handleClose();
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error, {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
        });
      });
  };

  const handleShipmentDelete = () => {
    dispatch(deleteShipmentByShipmentOrder(newShipmentData?.shipmentOrder))
      .unwrap()
      .then((response) => {
        toast.success(response.message, {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
        });
        setTimeout(() => {
          backToList();
        }, 2000);
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error, {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
        });
      });
  };

  const totalQty =
    packageDetail?.data?.itemDetails
      ?.map((item) => item.packed)
      .reduce((item, qty) => item + qty, 0) || 0;

      useEffect(() => {
        if (newShipmentData?.salesOrderId) {
          dispatch(getSaleOrderBySaleOrderId(newShipmentData.salesOrderId));
        }
        if (newShipmentData?.packageSlip) {
          dispatch(getPackageDetails(newShipmentData.packageSlip));
        }
      }, [dispatch, newShipmentData?.salesOrderId, newShipmentData?.packageSlip]);

  return (
    <div className="purchase-list">
      <h2>{newShipmentData?.shipmentOrder}</h2>
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
          <PrintOutlinedIcon className="action-icon" />
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
      <div>
        <div>
          <Accordion
            sx={{
              boxShadow: "none",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{ fontWeight: "bold" }}>
                Packages details
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className="shipment-dropdown-details">
                  <div className="shipment-package-id">
                    <div className="fw-bold mb-2">Package id</div>
                    <div className="text-primary">
                      {packageDetail?.data?.packageSlip}
                    </div>
                  </div>
                  <div className="shipment-package-id">
                    <div className="fw-bold mb-2">Date</div>
                    <div>{packageDetail?.data?.packageDate}</div>
                  </div>
                  <div className="shipment-package-id">
                    <div className="fw-bold mb-2">Quantity</div>
                    <div>{totalQty}</div>
                  </div>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{
              boxShadow: "none",
              borderBottom: "1px solid #ddd",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography sx={{ fontWeight: "bold" }}>
                Shipment details
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className="shipment-dropdown-details">
                  <div className="shipment-package-id">
                    <div className="fw-bold mb-2">Carrier</div>
                    <div>{newShipmentData?.carrier}</div>
                  </div>
                  <div className="shipment-package-id">
                    <div className="fw-bold mb-2">Shipment value</div>
                    <div>{newShipmentData.shipmentCharges}</div>
                  </div>
                  <div className="shipment-package-id">
                    <div className="fw-bold mb-2">Shipment date</div>
                    <div>{newShipmentData.shipmentDate}</div>
                  </div>
                  <div className="shipment-notes">
                    <div className="fw-bold">Notes</div>
                    <div>
                      {newShipmentData.notes}
                      <span className="text-primary ms-1">View more</span>
                    </div>
                  </div>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className="sales-invoice-outer-card mt-5" ref={componentRef}>
        <div className={updateStatus ? "delivered-label" : "shipped-label"}>
          {newShipmentData?.shipmentStatus}
        </div>
        <div className="sales-invoice-detail">
          <div className="sales-invoice">
            <div className="sales-invoice-heading mt-2">
              <div>LOGO</div>
              <div className="sales-id-text">xxxxxxxxxxxxx</div>
              <div className="sales-id-text">xxxxxxxxxxxxx</div>
            </div>
            <div className="sales-order-date">
              <div className="detail-heading mb-1">Shipment Order</div>
              <div className="sales-id-text">
                Shipment id: {newShipmentData.shipmentOrder}
              </div>
            </div>
          </div>
          <div className="shipments-carrier mt-5 me-2">
            <div>Shipment date: {newShipmentData.shipmentDate}</div>
            <div>Shipment Carrier: {newShipmentData.carrier}</div>
          </div>
          <div className="sales-invoice mt-5">
            <div className="mb-5">
              Ship to:
              <div>xxxxxxxxxxxx</div>
              <div>xxxxxxxxxxxx</div>
            </div>
            <div className="sales-order-date">
              <div className="shipment-order-row">
                <div className="shipment-label">Sales Order:</div>
                <div className="shipment-value">
                  {newShipmentData.salesOrderId}
                </div>
              </div>
              <div className="shipment-order-row">
                <div className="shipment-label">Order Date:</div>
                <div className="shipment-value">
                  {saleOrderData?.salesorderDate}
                </div>
              </div>
            </div>
          </div>
          <div className="row invoice-table mt-5">
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
                {saleOrderData &&
                  saleOrderData?.itemDetails.map((item, index) => (
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
        <DialogTitle className="purchase-list" sx={{padding:"0"}}>
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
    </div>
  );
};

export default ShipmentDetails;
