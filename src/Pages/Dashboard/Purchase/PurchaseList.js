import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import CreatePurchase from "./CreatePurchase";
import PurchaseDetails from "./PurchaseDetails";
import Select from "react-select";

const PurchaseList = () => {
  const [createPurchase, setCreatePurchase] = useState(false);
  const [openPurchaseDetail, setOpenPurchaseDetail] = useState(false);
  const [categoryOption, setCategoryOption] = useState(null);
  const [brandOption, setBrandOption] = useState(null);
  const [partyOption, setPartyOption] = useState(null);

  const options = [
    { value: "all", label: "All" },
    { value: "1", label: "One" },
    { value: "2", label: "Two" },
    { value: "3", label: "Three" },
  ];

  const handleCategoryChange = (selectedOption) => {
    setCategoryOption(selectedOption);
  };

  const handleBrandChange = (selectedOption) => {
    setBrandOption(selectedOption);
  };

  const handlePartyChange = (selectedOption) => {
    setPartyOption(selectedOption);
  };

  const openCreatePurchase = () => {
    setCreatePurchase(true);
    setOpenPurchaseDetail(false);
  };

  const openPurchaseDetails = () => {
    setOpenPurchaseDetail(true);
    setCreatePurchase(false);
  };

  const backToList = () => {
    setOpenPurchaseDetail(false);
    setCreatePurchase(false);
  };

  return (
    <div className="purchase-list">
      {openPurchaseDetail ? (
        <PurchaseDetails backToList={backToList} />
      ) : createPurchase ? (
        <CreatePurchase backToList={backToList} />
      ) : (
        <>
          <h2>Purchase</h2>
          <div className="row purchase-textfield">
            <div className="col-md-4">
              <InputGroup className="mb-3">
                <Form.Control
                  className="text-field"
                  placeholder="Search by Product"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </InputGroup>
            </div>
            <div className="col-md-2 text-field">
              <Select
                options={options}
                value={categoryOption}
                onChange={handleCategoryChange}
                isSearchable={true}
                classNamePrefix="custom-select"
                placeholder="Select a Category"
                menuPortalTarget={document.body} 
                styles={{
                  option: (provided) => ({
                    ...provided,
                    fontSize: '14px', 
                  }),
                }}
              />
            </div>
            <div className="col-md-2 text-field">
              <Select
                options={options}
                value={brandOption}
                onChange={handleBrandChange}
                isSearchable={true}
                classNamePrefix="custom-select"
                placeholder="Filter by Brand name"
                menuPortalTarget={document.body} 
                styles={{
                  option: (provided) => ({
                    ...provided,
                    fontSize: '14px',
                  }),
                }}
              />
            </div>
            <div className="col-md-2 text-field">
              <Select
                options={options}
                value={partyOption}
                onChange={handlePartyChange}
                isSearchable={true}
                classNamePrefix="custom-select"
                placeholder="Filter by Party"
                menuPortalTarget={document.body} 
                styles={{
                  option: (provided) => ({
                    ...provided,
                    fontSize: '14px',
                  }),
                }}
              />
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
                  <td className="purchase-id" onClick={openPurchaseDetails}>
                    #8697869768
                  </td>
                  <td>xxxxxxxxxxx</td>
                  <td>xxxxxxxxxxx</td>
                  <td>xxxxxxxxxxx</td>
                  <td>xxxxxxxxxxx</td>
                </tr>
                <tr>
                  <td className="purchase-id" onClick={openPurchaseDetails}>
                    #8697869769
                  </td>
                  <td>xxxxxxxxxxx</td>
                  <td>xxxxxxxxxxx</td>
                  <td>xxxxxxxxxxx</td>
                  <td>xxxxxxxxxxx</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="mt-4">
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
