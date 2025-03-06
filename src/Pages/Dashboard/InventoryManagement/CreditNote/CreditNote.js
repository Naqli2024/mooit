import React, { useEffect, useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import Table from "react-bootstrap/Table";
import NewCreditNote from "./NewCreditNote";
import { useDispatch, useSelector } from "react-redux";
import { getAllCreditNotes } from "../../../../Redux/creditNote/creditNoteSlice";
import InvoiceCell from "./InvoiceCell";
import Loader from "../../../../Helper/Loader";
import NewCreditNoteDetails from "./NewCreditNoteDetails";

const CreditNote = () => {
  const [openNewCreditNote, setOpenNewCreditNote] = useState(false);
  const dispatch = useDispatch();
  const { loading, creditNote } = useSelector((state) => state.creditNote);
  const [querySearch, setQuerySearch] = useState("");
  const [creditNoteData, setCreditNoteData] = useState();
  const [showCreditDetails, setShowCreditDetails] = useState(false);

  const backToList = () => {
    setOpenNewCreditNote(false);
    dispatch(getAllCreditNotes());
  };

  const filteredData = Array.isArray(creditNote)
    ? creditNote.filter((credit) =>
        ["creditNoteId", "salesOrderId", "customerName"].some((key) =>
          credit?.[key]?.toLowerCase().includes(querySearch.toLowerCase())
        )
      )
    : [];

  const handleCreditNote = (item) => {
    setCreditNoteData(item);
    setShowCreditDetails(true);
  };

  useEffect(() => {
    dispatch(getAllCreditNotes());
  }, [dispatch]);

  return (
    <div>
      {loading && <Loader />}
      {showCreditDetails ? (
        <NewCreditNoteDetails backToList={backToList} creditNote={creditNoteData} setShowCreditDetails={setShowCreditDetails} />
      ) : openNewCreditNote ? (
        <NewCreditNote backToList={backToList} setShowCreditDetails={setShowCreditDetails} />
      ) : (
        <div className="purchase-list">
          <h2>Credit note</h2>
          <div className="sales-return search-btn">
            <div className="col-md-4">
              <InputGroup className="search-input">
                <Form.Control
                  className="text-field search-icon-btn"
                  placeholder="Search here"
                  aria-label="Search"
                  value={querySearch}
                  onChange={(e) => setQuerySearch(e.target.value)}
                />
                <div className="divider"></div>
                <Button variant="outline-secondary" className="search-icon-btn">
                  <FaSearch />
                </Button>
              </InputGroup>
            </div>
            <button
              type="button"
              className="btn create-new-btn"
              onClick={() => setOpenNewCreditNote(true)}
            >
              Create new
            </button>
          </div>
          <div className="table-container mt-5 mx-4">
            <Table bordered className="custom-table sales-in-outbound-table">
              <thead>
                <tr>
                  <th>Credit note</th>
                  <th>Date</th>
                  <th>Customer name</th>
                  <th>Scenario</th>
                  <th>Status</th>
                  <th>Invoice</th>
                  <th>Credit amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={item.creditNoteId || index}>
                      <td
                        className="purchase-id"
                        onClick={() => handleCreditNote(item)}
                        style={{ cursor: "pointer" }}
                      >
                        {item.creditNoteId}
                      </td>
                      <td>{item.creditNoteDate}</td>
                      <td>{item.customerName}</td>
                      <td></td>
                      <td>{item.status}</td>
                      <td>
                        <InvoiceCell salesOrderId={item.salesOrderId} />
                      </td>
                      <td>{item.refundAmount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7}>No credit note found</td>
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

export default CreditNote;
