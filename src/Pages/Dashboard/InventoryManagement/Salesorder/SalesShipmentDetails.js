import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import { Table } from "react-bootstrap";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
  } from "@mui/material";
const SalesShipmentDetails = ({backToList}) => {
        const [open, setOpen] = useState(false);
        const [date, setDate] = useState("");
        const [time, setTime] = useState("");
     
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
     
        const handleUpdate = () => {
          handleClose();
        };
  return (
    <div>
        <h2>PKG-65746</h2>
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
              <PrintOutlinedIcon className="action-icon" />
              Print
            </div>
            <div className="divider"></div>
            <div className="action-btn print-btn" onClick={handleOpen}>
                Mark as delivered
            </div>
            <div className="divider"></div>
          </div>
          <div className="sales-invoice-outer-card mt-5">
            <div className="sales-invoice-detail">
              <div className="sales-invoice">
                <div className="sales-invoice-heading">
                  <div className="fw-bold">LOGO</div>
                  <div className="sales-id-text">xxxxxxxxxxxxx</div>
                  <div className="sales-id-text">xxxxxxxxxxxxx</div>
                </div>
                <div className="sales-order-date">
                  <div className="fw-bold fs-5">Shipment</div>
                  <div className="sales-id-text">SHP#7688</div>
                </div>
              </div>
              <div className="sales-invoice">
                  <div className="sales-order-bill">
                    <div className='fw-bold'>Ship to</div>
                    <div>xxxxxxxxxxxx</div>
                    <div>xxxxxxxxxxxx</div>
                  </div>
                  <div className="sales-order-ship">
                    <div>Shipment date:12/08/24</div>
                    <div>Sales order:768576</div>
                    <div>Order date:12/08/24</div>
                    <div>Carrier:Fedx</div>
                  </div>
                </div>
              <div className="row invoice-table">
                <Table className="table-content sales-invoice-table">
                  <thead>
                    <tr>
                      <th>Item & Description</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>xxxxxxxxxxxxxxx</td>
                      <td>1</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
          <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
            Shipment Update
            </DialogTitle>
        <DialogContent>
          {/* Date Field */}
          <TextField
            label="Delivery Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />


          {/* Time Field */}
          <TextField
            label="Delivery Time"
            type="time"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
        <Button onClick={handleUpdate} variant="contained" color="primary">
            Update
          </Button>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}


export default SalesShipmentDetails