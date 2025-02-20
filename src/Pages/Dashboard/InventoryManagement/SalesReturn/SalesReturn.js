import React, { useEffect, useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import Table from "react-bootstrap/Table";
import NewSalesReturn from "./NewSalesReturn";
import SalesReturnInvoice from "./SalesReturnInvoice";
import { useDispatch, useSelector } from "react-redux";
import { getAllSalesReturn } from "../../../../Redux/salesReturn/salesReturnSlice";
import Loader from "../../../../Helper/Loader";

const SalesReturn = () => {
  const [openNewSalesReturn, setOpenNewSalesReturn] = useState(false);
  const [openSalesReturnInvoice, setOpenSalesReturnInvoice] = useState(false);
  const dispatch = useDispatch();
  const { loading, salesReturnData } = useSelector(
    (state) => state.salesReturn
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [returnData, setReturnData] = useState();

  const handleNewSalesReturn = () => {
    setOpenNewSalesReturn(true);
  };

  const backToList = () => {
    setOpenNewSalesReturn(false);
    dispatch(getAllSalesReturn());
  };

  const filteredData = Array.isArray(salesReturnData)
    ? salesReturnData?.filter((data) =>
        ["customerName", "salesOrderId", "salesreturnId"].some((key) =>
          data?.[key]?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : [];

  const handleSalesReturn = (sales) => {
    setOpenSalesReturnInvoice(true);
    setReturnData(sales);
  };

  useEffect(() => {
    dispatch(getAllSalesReturn());
  }, [dispatch]);

  return (
    <div>
      {loading && <Loader />}
      {openNewSalesReturn ? (
        <NewSalesReturn backToList={backToList} openNewSalesReturn={setOpenNewSalesReturn}/>
      ) : openSalesReturnInvoice ? (
        <SalesReturnInvoice
          backToList={() => setOpenSalesReturnInvoice(false)}
          returnData={returnData}
        />
      ) : (
        <div className="purchase-list">
          <h2>Sales Return</h2>
          <div className="sales-return search-btn">
            <div className="col-md-4">
              <InputGroup className="search-input">
                <Form.Control
                  className="text-field search-icon-btn"
                  placeholder="Search here"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
              onClick={handleNewSalesReturn}
            >
              Create new
            </button>
          </div>
          <div className="table-container mt-5 mx-4">
            <Table bordered className="custom-table sales-in-outbound-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>RA#</th>
                  <th>Sales order</th>
                  <th>Customer name</th>
                  <th>Status</th>
                  <th>Refund status</th>
                  <th>Returned</th>
                  <th>Amount refunded</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((sales) => {
                    let totalReturned = 0;

                    // Get totalReturned without reduce
                    for (const item of sales.itemDetails) {
                      totalReturned += item.returned || 0;
                    }

                    return (
                      <tr key={sales.salesReturnId}>
                        <td>{sales.salesReturnDate}</td>
                        <td
                          className="purchase-id"
                          onClick={() => handleSalesReturn(sales)}
                        >
                          {sales.salesReturnId}
                        </td>
                        <td>{sales.salesOrderId}</td>
                        <td>{sales.customerName}</td>
                        <td>{sales.status}</td> 
                        <td></td>
                        <td>{totalReturned}</td>{" "}
                        <td></td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="9" style={{ textAlign: "center" }}>
                      No sales returns data found
                    </td>
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

export default SalesReturn;
