import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../../../Helper/Loader";
import { deletePurchaseById } from "../../../../Redux/features/deletePurchaseById";
import { updateVendorWithPurchase } from "../../../../Redux/vendor/vendorSlice";

const VendorPurchaseOrder = () => {
  const {
    loading,
    vendors = {},
    error,
  } = useSelector((state) => state.vendor) || {};
  const purchaseList = vendors?.purchaseList ?? [];
  const basicInformation = vendors?.basicInformation ?? {};
  const [checkedRows, setCheckedRows] = useState({});
  const dispatch = useDispatch();
  const payload = {
    firstName: basicInformation?.firstName,
    lastName: basicInformation?.lastName,
  };

  // Function to handle the checkbox for each row
  const handleCheckboxChange = (index) => {
    setCheckedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Check if any row is checked
  const anyRowChecked = Object.values(checkedRows).some(
    (isChecked) => isChecked
  );

  const handleDeletePurchase = (id) => {
    dispatch(deletePurchaseById(id))
      .unwrap()
      .then((response) => {
        toast.success(response.message, {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
        });
        setTimeout(() => {
          dispatch(updateVendorWithPurchase(payload));
        }, 2000);
      })
      .catch((error) =>
        toast.error(error, {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
        })
      );
  };

  useEffect(() => {
    dispatch(updateVendorWithPurchase(payload))
      .unwrap()
      .catch((error) =>
        toast.error(error, {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
        })
      );
  }, [dispatch]);

  return (
    <div className="table-container">
      {loading && <Loader />}
      <Table bordered className="custom-table sales-in-outbound-table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Purchase id</th>
            <th>Product name</th>
            <th>SKU</th>
            <th>Quantity</th>
            <th>Price</th>
            {anyRowChecked && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {purchaseList?.length > 0 ? (
            purchaseList.map((list, index) => (
              <tr key={index} className="align-middle">
                <td>
                  <input
                    type="checkbox"
                    checked={checkedRows[index] || false}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
                <td className="purchase-id">{list?._id}</td>
                <td>{list?.productName}</td>
                <td>{list?.sku}</td>
                <td>{list?.quantity}</td>
                <td>{list?.purchaseRate}</td>
                {checkedRows[index] && (
                  <td>
                    <button
                      className="btn btn-danger flex-grow-1"
                      onClick={() => handleDeletePurchase(list?._id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No purchase found</td>
            </tr>
          )}
        </tbody>
      </Table>
      <ToastContainer />
    </div>
  );
};

export default VendorPurchaseOrder;
