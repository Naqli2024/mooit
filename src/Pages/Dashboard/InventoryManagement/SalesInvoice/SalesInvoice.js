import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import NewSalesInvoice from "./NewSalesInvoice";
import ReviseInvoice from "./ReviseInvoice";
import { useDispatch, useSelector } from "react-redux";
import { getAllInvoices } from "../../../../Redux/salesInvoiceSlice/salesInvoice";
import SalesInvoiceDetails from "./SalesInvoiceDetails";

const SalesInvoice = () => {
  const [filter, setFilter] = React.useState("");
  const [openNewSalesInvoice, setOpenNewSalesInvoice] = useState(false);
  const [openReviseInvoice, setOpenReviseInvoice] = useState(false);
  const { salesInvoiceData } = useSelector((state) => state.salesInvoice);
  const dispatch = useDispatch();
  const [querySearch, setQuerySearch] = useState("");
  const [invoiceDetails, setInvoiceDetails] = useState(false);
  const [salesInvoice, setSalesInvoice] = useState(null);

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredData = Array.isArray(salesInvoiceData)
    ? salesInvoiceData.filter((invoice) =>
        ["invoiceId", "salesOrderId", "customerName"].some((key) =>
          invoice?.[key]?.toString().toLowerCase().includes(querySearch.toLowerCase())
        )
      )
    : [];

  const handleInvoiceDetails = (data) => {
    if (data?.PaymentStatus === "Paid") {
      setOpenReviseInvoice(true);
    } else {
      setInvoiceDetails(true);
      setSalesInvoice(data);
    }
  };

  const backToList = () => {
    setOpenNewSalesInvoice(false);
    dispatch(getAllInvoices());
  }

  useEffect(() => {
    dispatch(getAllInvoices());
  }, [dispatch, backToList]);

  return (
    <div>
      {openNewSalesInvoice ? (
        <NewSalesInvoice
          backToList={backToList}
        />
      ) : openReviseInvoice ? (
        <ReviseInvoice backToList={() => setOpenReviseInvoice(false)} />
      ) : invoiceDetails ? (
        <SalesInvoiceDetails
          backToList={() => setInvoiceDetails(false)}
          salesInvoice={salesInvoice} // ✅ Correctly passing salesInvoice
        />
      ) : (
        <div className="purchase-list">
          <h2>Sales Invoice</h2>
          <div className="package-text-field">
            <div className="d-md-flex">
              <div className="shipment-search-field">
                <InputGroup>
                  <Form.Control
                    placeholder="Search by product"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    value={querySearch}
                    onChange={(e) => setQuerySearch(e.target.value)}
                  />
                </InputGroup>
              </div>
              <div className="col-md-3 col-sm-12 mt-2 mt-md-0 ms-md-3">
                <FormControl sx={{ minWidth: 120 }}>
                  <Select
                    className="package-filter"
                    value={filter}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    sx={{ fontSize: "14px" }}
                  >
                    <MenuItem sx={{ fontSize: "14px" }} value="">
                      <em>Status</em>
                    </MenuItem>
                    <MenuItem sx={{ fontSize: "14px" }} value="All">
                      All
                    </MenuItem>
                    <MenuItem sx={{ fontSize: "14px" }} value="Draft">
                      Draft
                    </MenuItem>
                    <MenuItem sx={{ fontSize: "14px" }} value="Overdue">
                      Overdue
                    </MenuItem>
                    <MenuItem sx={{ fontSize: "14px" }} value="Paid">
                      Paid
                    </MenuItem>
                    <MenuItem sx={{ fontSize: "14px" }} value="Pending">
                      Pending
                    </MenuItem>
                    <MenuItem sx={{ fontSize: "14px" }} value="HalfPaid">
                      HalfPaid
                    </MenuItem>
                    <MenuItem sx={{ fontSize: "14px" }} value="Void">
                      Void
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <button
              type="button"
              className="btn create-new-btn"
              onClick={() => setOpenNewSalesInvoice(true)}
            >
              New Invoice
            </button>
          </div>
          <div className="table-container mx-5">
            <Table bordered className="custom-table sales-in-outbound-table">
              <thead>
                <tr>
                  <th>Invoice id</th>
                  <th>Date</th>
                  <th>Sales order</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Due date</th>
                  <th>Total amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredData && filteredData.length > 0 ? (
                  filteredData.map((data) => (
                    <tr key={data.invoiceId}> {/* ✅ Corrected key */}
                      <td
                        className="purchase-id"
                        onClick={() => handleInvoiceDetails(data)}
                      >
                        {data.invoiceId}
                      </td>
                      <td>{data.invoiceDate}</td>
                      <td>{data.salesOrderId}</td>
                      <td>{data.customerName}</td>
                      <td className="draft-status">{data.status}</td>
                      <td>{data.dueDate}</td>
                      <td>{data.totalAmount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7}>No invoice found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesInvoice;
