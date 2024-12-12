import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import CreatePurchase from "./CreatePurchase";

const PurchaseList = () => {
  const [createPurchase, setCreatePurchase] = useState(false);

  const openCreatePurchase = () => {
    setCreatePurchase(!createPurchase);
  };
  return (
    <div className="purchase-list">
      <h2>Purchase</h2>

      {createPurchase ? (
        <CreatePurchase openCreatePurchase={openCreatePurchase}/>
      ) : (
        <>
          <div className="row purchase-textfield">
            <div className="col-md-4">
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Search by Product"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </InputGroup>
            </div>
            <div className="col-md-2">
              <Form.Select>
                <option>Select a Category</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </div>
            <div className="col-md-2">
              <Form.Select>
                <option>Filter by Brand name</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                <option value="4">Four</option>
              </Form.Select>
            </div>
            <div className="col-md-2">
              <Form.Select>
                <option>Filter by Party</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </div>
          </div>

          <div className="table-container mx-5">
            <Table bordered className="custom-table">
              <thead>
                <tr>
                  <th>Purchase Id</th>
                  <th>Product name</th>
                  <th>SKU</th>
                  <th>Price</th>
                  <th>Vendor name</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="purchase-id">#8697869768</td>
                  <td>xxxxxxxxxxx</td>
                  <td>xxxxxxxxxxx</td>
                  <td>xxxxxxxxxxx</td>
                  <td>xxxxxxxxxxx</td>
                </tr>
                <tr>
                  <td className="purchase-id">#8697869768</td>
                  <td>xxxxxxxxxxx</td>
                  <td>xxxxxxxxxxx</td>
                  <td>xxxxxxxxxxx</td>
                  <td>xxxxxxxxxxx</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="container mt-4">
            <div className="col d-flex justify-content-end">
              <button
                type="button"
                className="btn create-purchase-btn"
                onClick={openCreatePurchase}
              >
                Create New Purchase
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PurchaseList;
