import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { InputGroup, Form, Button } from "react-bootstrap";
import Select from "react-select";
import { Col, Row } from "react-bootstrap";
import NewCreditNoteDetails from "./NewCreditNoteDetails";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { newCreditNoteSchema } from "../../../../Helper/validation";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Table from "react-bootstrap/Table";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import ClearIcon from '@mui/icons-material/Clear';

const NewCreditNote = ({ backToList }) => {
  const [openNewCreditNoteDetails, setOpenNewCreditNoteDetails] = useState(false);
  const [isShippingLocked, setIsShippingLocked] = useState(true);
  const [isVATLocked, setIsVATLocked] = useState(true);
  
  const {
      register,
      handleSubmit,
      setValue,
      trigger,
      formState: { errors },
    } = useForm({ resolver: yupResolver(newCreditNoteSchema) });
    
  const categoryOptions = [
    { value: "electronics", label: "Electronics" },
    { value: "furniture", label: "Furniture" },
  ];

  const onSubmit = (data) => {
    setOpenNewCreditNoteDetails(true);
  };

  return (
    <div>
      {openNewCreditNoteDetails ? (
        <NewCreditNoteDetails
          backToList={() => setOpenNewCreditNoteDetails(false)}
        />
      ) : (
        <div className="purchase-list">
          <h2>New Credit note</h2>
          <button onClick={backToList} className="goBack-btn">
            <span>
              <ArrowBackIosIcon />
            </span>
            Back
          </button>
          <form onSubmit={handleSubmit(onSubmit)} className="new-package-form">
          <p>Company name - #23455</p>
          <hr/>
            <div className="new-package-name-sales mb-4 mt-5">
              <Form.Group className="col-md-5 customer-name-dropdown">
              <div className="d-flex align-items-center gap-2">
                  <Form.Label className="custom-label mb-0">
                    Customer name
                  </Form.Label>
                  {errors.customerName && (
                    <ErrorOutlineOutlinedIcon className="text-danger" />
                  )}
                </div>
                <div className="form-group inventory-custom-dropdown mt-2">
                  <Select
                    options={categoryOptions}
                    isSearchable={true}
                    classNamePrefix="custom-select"
                    onChange={(selected) => {
                      setValue("customerName", selected.value); 
                      trigger("customerName"); 
                    }}
                  />
                </div>
              </Form.Group>
              <Form.Group className="col-md-5 customer-name-dropdown me-md-5">
              <div className="d-flex align-items-center">
                  <Form.Label className="custom-label mb-0">
                    Sales order
                  </Form.Label>
                  {errors.salesOrder && (
                    <ErrorOutlineOutlinedIcon className="text-danger ms-2" />
                  )}
                </div>
                <div className="form-group inventory-custom-dropdown mt-2">
                  <Select
                    options={categoryOptions}
                    isSearchable={true}
                    classNamePrefix="custom-select"
                    onChange={(selected) => {
                      setValue("salesOrder", selected.value);
                      trigger("salesOrder");
                    }}
                  />
                </div>
              </Form.Group>
            </div>
            <hr />
            <div className="sales-address mt-4 mb-4">
            <div className="billing-address col-md-6 me-4">
            <div className="edit-icon">Billing address<span><EditOutlinedIcon/></span></div>
              <div>xxxxxxxxxxxxx</div>
              <div>xxxxxxxxxxxxx</div>
              <div>xxxxxxxxxxxxx</div>
            </div>
            <div className="shipping-address col-md-">
            <div className="edit-icon">Shipping address<span><EditOutlinedIcon/></span></div>
              <div>xxxxxxxxxxxxx</div>
              <div>xxxxxxxxxxxxx</div>
              <div>xxxxxxxxxxxxx</div>
            </div>
          </div>
            <div className="new-package-name-sales mb-4">
              <div className="col-md-4 mt-3">
                <Form.Group>
                  <div className="d-flex align-items-center">
                  <Form.Label className="custom-label mb-0">
                  Credit note id
                  </Form.Label>
                  {errors.creditNoteId && (
                    <ErrorOutlineOutlinedIcon className="text-danger ms-2" />
                  )}
                </div>
                  <InputGroup className="mt-2">
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="custom-textfield"
                      {...register("creditNoteId")}
                    />
                  </InputGroup>
                </Form.Group>
              </div>
              <div className="col-md-4 mt-3 form-right-field">
                <Form.Group>
                  <div className="d-flex align-items-center">
                  <Form.Label className="custom-label mb-0">
                  Credit note date
                  </Form.Label>
                  {errors.creditNoteDate && (
                    <ErrorOutlineOutlinedIcon className="text-danger ms-2" />
                  )}
                </div>
                  <InputGroup className="mt-2">
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="custom-textfield"
                      {...register("creditNoteDate")}
                      type="date"
                    />
                  </InputGroup>
                </Form.Group>
              </div>
            </div>
            <div className="new-package-name-sales mb-4">
              <div className="col-md-4 mt-4">
                <Form.Group>
                  <div className="d-flex align-items-center">
                  <Form.Label className="custom-label mb-0">
                  Sales person
                  </Form.Label>
                  {errors.salesPerson && (
                    <ErrorOutlineOutlinedIcon className="text-danger ms-2" />
                  )}
                </div>
                  <InputGroup className="mt-2">
                    <Form.Select
                      aria-label="Select Status"
                      className="custom-textfield"
                      {...register("salesPerson")}
                    >
                      <option value="">Sales person</option>
                      <option value="person1">Person 1</option>
                      <option value="person2">Person 2</option>
                    </Form.Select>
                  </InputGroup>
                </Form.Group>
              </div>
            </div>
            <div className="table-container delivery-tableWrapper mt-5 ms-0">
              <Table
                bordered
                className="custom-table sales-in-outbound-table delivery-tableHeader"
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Item name</th>
                    <th>Reason</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>GST</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>xxxxxxxxx<br/>SKU#75845<span><ClearIcon className="table-item-cancel"/></span></td>
                    <td><input type="text" style={{ width: "100%" }} /></td>
                    <td><input type="text" className="form-control fixed-input" /></td>
                    <td><input type="text" className="form-control fixed-input" /></td>
                    <td><input type="text" className="form-control fixed-input" /></td>
                    <td><input type="text" className="form-control fixed-input" /></td>
                    <td><input type="text" className="form-control fixed-input" /></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>xxxxxxxxx<br/>SKU#75845<span><ClearIcon className="table-item-cancel"/></span></td>
                    <td><input type="text" style={{ width: "100%" }} /></td>
                    <td><input type="text" className="form-control fixed-input" /></td>
                    <td><input type="text" className="form-control fixed-input" /></td>
                    <td><input type="text" className="form-control fixed-input" /></td>
                    <td><input type="text" className="form-control fixed-input" /></td>
                    <td><input type="text" className="form-control fixed-input" /></td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div className="credit-note-notes">
            <div className="col-md-4 mt-3">
                <Form.Group>
                  <Form.Label className="custom-label mb-0">
                  Notes
                  </Form.Label>
                  <InputGroup className="mt-2">
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      className="description-textfield"
                    />
                  </InputGroup>
                </Form.Group>
              </div>
              <div className="credit-note-bottom-content me-3">
              <div className="open-inventory">
                <p className="col-md-8">Subtotal</p>
                <p className="col-md-3 d-flex justify-content-center fw-normal">
                  850
                </p>
              </div>
              <div className="open-inventory">
                <p onClick={()=>setIsShippingLocked(!isShippingLocked)}>
                  {isShippingLocked ? <LockOutlinedIcon/> :<LockOpenOutlinedIcon/>}</p>
                <p className="col-8">Shipping charges</p>
                <p className="col-3 fw-normal">
                  <input type="text" className="form-control text-center" readOnly={isShippingLocked}/>
                </p>
              </div>
              <div className="open-inventory">
              <p onClick={()=>setIsVATLocked(!isVATLocked)}>
                  {isVATLocked ? <LockOutlinedIcon/> :<LockOpenOutlinedIcon/>}</p>
                <p className="col-8">VAT%</p>
                <p className="col-3 fw-normal">
                  <input type="text" className="form-control text-center" readOnly={isVATLocked}/>
                </p>
              </div>
              <div className="open-inventory">
                <p className="col-8 fw-normal">Price adjustment</p>
                <p className="col-3 fw-normal">
                  <input type="text" className="form-control text-center" />
                </p>
              </div>
              <div className="open-inventory fw-bold">
                <p className="col-md-8">Total amount</p>
                <p className="col-md-3 d-flex justify-content-center">
                  200
                </p>
              </div>
              <div className="open-inventory fw-bold">
                <p className="col-md-8">Refund amount</p>
                <p className="col-md-3 d-flex justify-content-center">
                  100
                </p>
              </div>
            </div>
            </div>
            <div className="container-fluid">
              <div className="row justify-content-center mt-5">
                <div className="col-12 col-md-3 d-flex justify-content-between gap-2">
                  <button
                    type="submit"
                    className="btn flex-grow-1"
                    style={{ color: "white", backgroundColor: "#1F3F7F" }}
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-danger flex-grow-1"
                    onClick={backToList}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default NewCreditNote;
