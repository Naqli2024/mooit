import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { paymentTerms } from "../../../../Data/SalesOrderData";

const CreateSaleOrderForm = () => {
  const [rows, setRows] = useState([
    { name: "", quantity: 1, price: 0.0, discount: 0, gst: 0, amount: 0 },
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      { name: "", quantity: 1, price: 0.0, discount: 0, gst: 0, amount: 0 },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    updatedRows[index].amount =
      updatedRows[index].price -
      updatedRows[index].discount +
      (updatedRows[index].price * updatedRows[index].gst) / 100;
    setRows(updatedRows);
  };

  return (
    <div className="saleOrder-form">
      <Form>
        <Row>
          <Form.Group className="mb-3">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control type="text" placeholder="Enter customer name" />
          </Form.Group>
        </Row>

        <Row className="row-cols-auto justify-content-between">
          <Col md="3" sm="10">
            <Form.Group className="mb-3">
              <Form.Label>Sales Order ID</Form.Label>
              <Form.Control type="text" placeholder="Enter sales order ID" />
            </Form.Group>
          </Col>

          <Col md="3" sm="10">
            <Form.Group className="mb-3">
              <Form.Label>Sales Order Date</Form.Label>
              <Form.Control type="date" placeholder="Select date" />
            </Form.Group>
          </Col>

          <Col md="3" sm="10">
            <Form.Group className="mb-3">
              <Form.Label>Payment terms</Form.Label>
              <Form.Select aria-label="Default select example">
                {paymentTerms.map((terms) => (
                  <option>{terms}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="row-cols-auto justify-content-between">
          <Col md="3" sm="10">
            <Form.Group className="mb-3">
              <Form.Label>Shipment Date</Form.Label>
              <Form.Control type="date" placeholder="Select date" />
            </Form.Group>
          </Col>
          <Col md="3" sm="10">
            <Form.Group className="mb-3">
              <Form.Label>Delivery Method</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Select delivery method</option>
                <option value="1">Consolidated Shipping</option>
                <option value="2">Express Delivery</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md="3" sm="10">
            <Form.Group className="mb-3">
              <Form.Label>Sales person</Form.Label>
              <Form.Control type="text" placeholder="Enter sales order ID" />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Discount</th>
                <th>GST</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={row.name}
                      onChange={(e) =>
                        handleInputChange(index, "name", e.target.value)
                      }
                      placeholder="Type or select an item"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.quantity}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "quantity",
                          parseFloat(e.target.value)
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.price}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "price",
                          parseFloat(e.target.value)
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.discount}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "discount",
                          parseFloat(e.target.value)
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.gst}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "gst",
                          parseFloat(e.target.value)
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.amount.toFixed(2)}
                      readOnly
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={addRow} className="add-item-btn">
            Add an item +
          </button>
        </Row>

        <Row className="mt-3">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </Row>
      </Form>
    </div>
  );
};

export default CreateSaleOrderForm;
