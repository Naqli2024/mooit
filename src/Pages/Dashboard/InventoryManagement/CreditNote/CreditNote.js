import React, { useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import Table from "react-bootstrap/Table";
import NewCreditNote from "./NewCreditNote";

const CreditNote = () => {
  const [openNewCreditNote, setOpenNewCreditNote] = useState(false);

  const backToList = () => {
    setOpenNewCreditNote(false);
  };

  return (
    <div>
      {openNewCreditNote ? (
        <NewCreditNote backToList={()=>setOpenNewCreditNote(false)}/>
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
              onClick={()=>setOpenNewCreditNote(true)}
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
                  <th>Amount</th>
                  <th>Balance amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="purchase-id">CN-9595</td>
                  <td>24/4/2024</td>
                  <td>John doe</td>
                  <td>Invoice mistake</td>
                  <td>Draft</td>
                  <td>IN-86754</td>
                  <td>50</td>
                  <td>0.00</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditNote;
