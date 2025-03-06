import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import CreatePurchase from "./CreatePurchase";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllVendors } from "../../../../Redux/vendor/vendorSlice";
import { getPurchaseDetails } from "../../../../Redux/features/getPurchaseDetailsSlice";
import PurchaseDetails from "./PurchaseDetails";

const PurchaseList = () => {
  const [createPurchase, setCreatePurchase] = useState(false);
  const [openPurchaseDetail, setOpenPurchaseDetail] = useState(false);
  const [categoryOption, setCategoryOption] = useState(null);
  const [brandOption, setBrandOption] = useState(null);
  const [partyOption, setPartyOption] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(
    (state) => state.getPurchaseDetails
  );
  const { vendors } = useSelector((state) => state.vendor);
  // Derive dropdown options dynamically from data
  const categoryOptions = [
    { value: "All", label: "All" },
    ...Array.from(new Set(data?.map((item) => item.category || ""))).map(
      (category) => ({
        value: category,
        label: category,
      })
    ),
  ];

  const brandOptions = [
    { value: "All", label: "All" },
    ...Array.from(new Set(data?.map((item) => item.brandName || ""))).map(
      (brand) => ({
        value: brand,
        label: brand,
      })
    ),
  ];

  const partyOptions = [
    { value: "All", label: "All" },
    ...Array.from(
      new Set(
        vendors?.map(
          (item) =>
            `${item.basicInformation.firstName} ${item.basicInformation.lastName}`
        )
      )
    ).map((vendor) => ({
      value: vendor,
      label: vendor,
    })),
  ];
  const navigate = useNavigate();

  const handleCategoryChange = (selectedOption) =>
    setCategoryOption(selectedOption);

  const handleBrandChange = (selectedOption) => {
    setBrandOption(selectedOption);
  };

  const handlePartyChange = (selectedOption) => {
    setPartyOption(selectedOption);
  };

  // Unified filter logic
  const filteredData = data?.filter((item) => {
    const matchesSearchQuery =
      !searchQuery ||
      item.productName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !categoryOption ||
      categoryOption.value === "All" ||
      item.category === categoryOption.value;
    const matchesBrand =
      !brandOption ||
      brandOption.value === "All" ||
      item.brandName === brandOption.value;
    const matchesParty =
      !partyOption ||
      partyOption.value === "All" ||
      item.vendorName === partyOption.value;

    return (
      matchesSearchQuery && matchesCategory && matchesBrand && matchesParty
    );
  });

  const openCreatePurchase = () => {
    setCreatePurchase(true);
    setOpenPurchaseDetail(false);
  };

  const openPurchaseDetails = (id) => {
    setOpenPurchaseDetail(true);
    setCreatePurchase(false);
    navigate(`/admin/purchase-details/${id}`);
  };

  const backToList = () => {
    setOpenPurchaseDetail(false);
    setCreatePurchase(false);
  };

  useEffect(() => {
    dispatch(getPurchaseDetails());
    dispatch(getAllVendors());
  }, [dispatch]);

  return (
    <div className="purchase-list">
      {openPurchaseDetail ? (
        <PurchaseDetails />
      ) : createPurchase ? (
        <CreatePurchase backToList={backToList} />
      ) : (
        <>
          <h2>Purchase</h2>
          <div className="row purchase-textfield col-12">
            <div className="col-md-3 text-field">
              <InputGroup className="mb-3">
                <Form.Control
                  className="text-field"
                  placeholder="Search by Product"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </InputGroup>
            </div>
            <div className="col-md-2 text-field">
              <Select
                options={categoryOptions}
                value={categoryOption}
                onChange={handleCategoryChange}
                isSearchable={true}
                classNamePrefix="custom-select"
                placeholder="Select a Category"
                menuPortalTarget={document.body}
                styles={{
                  option: (provided) => ({
                    ...provided,
                    fontSize: "14px",
                  }),
                }}
              />
            </div>
            <div className="col-md-3 mb-3 text-field">
              <Select
                options={brandOptions}
                value={brandOption}
                onChange={handleBrandChange}
                isSearchable={true}
                classNamePrefix="custom-select"
                placeholder="Filter by Brand name"
                menuPortalTarget={document.body}
                styles={{
                  option: (provided) => ({
                    ...provided,
                    fontSize: "14px",
                  }),
                }}
              />
            </div>
            <div className="col-md-2 text-field">
              <Select
                options={partyOptions}
                value={partyOption}
                onChange={handlePartyChange}
                isSearchable={true}
                classNamePrefix="custom-select"
                placeholder="Filter by Vendor"
                menuPortalTarget={document.body}
                styles={{
                  option: (provided) => ({
                    ...provided,
                    fontSize: "14px",
                  }),
                }}
              />
            </div>
          </div>

          <div className="table-container mx-5">
            <Table bordered className="custom-table sales-in-outbound-table">
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
                {filteredData?.length > 0 ? (
                  filteredData.map((data) => (
                    <tr>
                      <td
                        className="purchase-id"
                        onClick={() => openPurchaseDetails(data._id)}
                      >
                        {data._id}
                      </td>
                      <td>{data.productName}</td>
                      <td>{data.sku}</td>
                      <td>{data.unitPrice}</td>
                      <td>{data.vendorName}</td>
                    </tr>
                  ))
                ) : (
                  <tr colspan={5}>
                    <td>No purchase list found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          <div className="mt-4 me-5">
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
