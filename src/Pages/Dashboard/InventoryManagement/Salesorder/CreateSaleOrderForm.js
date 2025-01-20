import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { paymentTerms } from "../../../../Data/SalesOrderData";
import Select from "react-select";
import { LiaEditSolid } from "react-icons/lia";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const CreateSaleOrderForm = ({ backToList }) => {
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

  const customerName = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  return (
    <>
    <h2>Sales Order</h2>
      <button onClick={backToList} className="goBack-btn sales-back-btn">
        <span>
          <ArrowBackIosIcon />
        </span>
        Back
      </button>
      <div className="saleOrder-form">
        <Form>
          <Row>
            <Form.Group className="mb-5">
              <Form.Label className="custom-label ">Customer Name</Form.Label>
              <Select
                options={customerName}
                value={selectedOption}
                onChange={handleChange}
                isSearchable={true}
                classNamePrefix="custom-select"
                placeholder="Select or type here"
                className="sales-order-label"
              />
            </Form.Group>
          </Row>
          {/* <div className="sales-address">
            <div className="billing-address">
            <div className="edit-icon">Billing address<span><EditOutlinedIcon/></span></div>
              <div>xxxxxxxxxxxxx</div>
              <div>xxxxxxxxxxxxx</div>
              <div>xxxxxxxxxxxxx</div>
            </div>
            <div className="shipping-address">
            <div className="edit-icon">Shipping address<span><EditOutlinedIcon/></span></div>
              <div>xxxxxxxxxxxxx</div>
              <div>xxxxxxxxxxxxx</div>
              <div>xxxxxxxxxxxxx</div>
            </div>
          </div> */}

          <Row className="row-cols-auto justify-content-between mb-4 mt-4">
            <Col md="3" sm="12" xs="12">
              <Form.Group className="mb-3">
                <Form.Label>Sales Order ID</Form.Label>
                <Form.Control className="sales-order-label" type="text" />
              </Form.Group>
            </Col>

            <Col md="3" sm="12" xs="12">
              <Form.Group className="mb-3">
                <Form.Label>Sales Order Date</Form.Label>
                <Form.Control className="sales-order-label" type="date" />
              </Form.Group>
            </Col>

            <Col md="3" sm="12" xs="12">
              <Form.Group className="mb-3">
                <Form.Label>Payment terms</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="sales-order-label"
                >
                  {paymentTerms.map((terms) => (
                    <option>{terms}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="row-cols-auto justify-content-between mb-4">
            <Col md="3" sm="12" xs="12">
              <Form.Group className="mb-3">
                <Form.Label>Shipment Date</Form.Label>
                <Form.Control className="sales-order-label" type="date" />
              </Form.Group>
            </Col>
            <Col md="3" sm="12" xs="12">
              <Form.Group className="mb-3">
                <Form.Label>Delivery Method</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="sales-order-label"
                >
                  <option value="1">Consolidated Shipping</option>
                  <option value="2">Express Delivery</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md="3" sm="12" xs="12">
              <Form.Group className="mb-3">
                <Form.Label>Sales person</Form.Label>
                <Form.Control className="sales-order-label" type="text" />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <div className="sales-table-outer-border">
              <table className="custom-table new-sales-table">
                <thead>
                  <tr>
                    <th className="item-details-header" colSpan={6}>
                      Item details
                    </th>
                    <th>
                      <div className="goBack-btn">
                        <span className="me-2">
                          <LiaEditSolid />
                        </span>
                        Edit column
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <th className="sales-name-text" colSpan={2}>
                      Name
                    </th>
                    <th className="text-center">Quantity</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Discount</th>
                    <th className="text-center">GST</th>
                    <th className="text-center">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index}>
                      <td className="col-span-2" colSpan={2}>
                        <input
                          className="select-an-item"
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
              <button
                type="button"
                onClick={addRow}
                className="add-item-button"
              >
                Add an item +
              </button>
            </div>
          </Row>

          <div className="sales-bottom-content">
            <div className="open-inventory">
              <div className="col-md-8">Subtotal</div>
              <div className="col-md-3 fw-normal">0.00</div>
            </div>
            <div className="restock-point mt-3">
              <div className="col-md-8 fw-normal">Shipment charges</div>
              <div className="col-md-3 fw-normal">
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="restock-point mt-3">
              <div className="col-md-8 fw-normal">Total</div>
              <div className="col-md-3 fw-normal">0.00</div>
            </div>
          </div>
          <div className="new-sales-btn mt-5 mb-5">
            <button type="submit" className="btn btn-primary save-download-btn">
              Save & Download
            </button>
            <button type="submit" className="btn save-draft-btn">
              Save as draft
            </button>
            <button type="submit" className="btn btn-danger sales-cancel-btn">
              Cancel
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default CreateSaleOrderForm;
