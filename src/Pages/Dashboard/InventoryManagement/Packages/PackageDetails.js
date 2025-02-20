import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import Table from "react-bootstrap/Table";
import NewShipment from "./NewShipment";
import { useReactToPrint } from "react-to-print";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../Helper/Loader";
import { toast, ToastContainer } from "react-toastify";
import { deletePackageByPackageSlip } from "../../../../Redux/package/deletePackage";
import { getShipmentDetails } from "../../../../Redux/shipment/shipmentSlice";

const PackageDetails = ({ packageDetail, backToList }) => {
  const [openPackageShipment, setPackageShipment] = useState(false);
  const componentRef = React.useRef(null);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.deletePackage);
  const { data } = useSelector((state) => state.shipment);
  const [showShipmentStatus, setShowShipmentStatus] = useState(false);
  console.log(data)

  const totalQuantity =
    packageDetail &&
    packageDetail.itemDetails.reduce((total, item) => total + item.quantity, 0);

  const handlePackageShipment = () => {
    setPackageShipment(true);
  };

  const handleAfterPrint = React.useCallback(() => {
    console.log("`onAfterPrint` called");
  }, []);

  const handleBeforePrint = React.useCallback(() => {
    console.log("`onBeforePrint` called");
    return Promise.resolve();
  }, []);

  const reactToPrintFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Package Details",
    onAfterPrint: handleAfterPrint,
    onBeforePrint: handleBeforePrint,
  });

  const handlePackageDelete = () => {
    dispatch(deletePackageByPackageSlip(packageDetail?.packageSlip))
      .unwrap()
      .then((response) => {
        toast.success(response.message, {
          position: "top-center",
          autoClose: 3000,
          closeButton: false,
        });
        setTimeout(() => {
          backToList();
        }, 2000);
      })
      .catch((error) => {
        console.log(error)
        toast.error(error, {
          position: "top-center",
          autoClose: 3000,
          closeButton: false,
        });
      });
  };

  useEffect(() => {
    if(packageDetail?.salesOrderId) {
      dispatch(getShipmentDetails(packageDetail?.salesOrderId));
    }
  }, [dispatch, packageDetail?.salesOrderId]);

  useEffect(() => {
    if (!(data?.data?.shipmentStatus) || data?.data?.shipmentStatus === "Not Shipped") {
      setShowShipmentStatus(true);
    }
  }, [data]);

  const getShipmentClass = (status) => {
    switch (status) {
      case "Delivered":
        return "delivered-label";
      case "Not Shipped":
        return "package-label";
      default:
        return "shipped-label";
    }
  };
  
  return (
    <div>
      {loading && <Loader />}
      {openPackageShipment ? (
        <NewShipment
          backToList={() => setPackageShipment(!setPackageShipment)}
          packageDetail={packageDetail}
        />
      ) : (
        <div className="purchase-list">
          <h2>Packages</h2>
          <button onClick={backToList} className="goBack-btn">
            <span>
              <ArrowBackIosIcon />
            </span>
            Back
          </button>
          <div className="edit-print-del-btn">
            <div className="action-btn edit-btn">
              <EditOutlinedIcon className="action-icon" />
              Edit
            </div>
            <div className="divider"></div>
            <div className="action-btn print-btn" onClick={reactToPrintFn}>
              <PrintOutlinedIcon className="action-icon" />
              Print
            </div>
            <div className="divider"></div>
            {showShipmentStatus && (
              <>
                <div
                  className="action-btn print-btn"
                  onClick={handlePackageShipment}
                >
                  Ship
                </div>
                <div className="divider"></div>
              </>
            )}
            <div
              className="action-btn delete-btn"
              onClick={() => handlePackageDelete()}
            >
              <DeleteOutlineSharpIcon className="action-icon" />
              Delete
            </div>
            <div className="divider"></div>
          </div>
          <div className="sales-invoice-outer-card mt-5" ref={componentRef}>
            <div className={getShipmentClass(data?.data?.shipmentStatus || "Not Shipped")}>
              {data?.data?.shipmentStatus || "Not Shipped"}</div>
            <div className="sales-invoice-detail">
              <div className="sales-invoice">
                <div></div>
                <div className="sales-order-date">
                  <div className="detail-heading mb-1">Package</div>
                  <div className="sales-id-text">
                    Package id: {packageDetail.packageSlip}
                  </div>
                </div>
              </div>
              <div className="shipments-carrier mt-5">
                <div className="package-order-date">
                  Package date: {packageDetail.packageDate}
                </div>
                <div>Sales order: {packageDetail.salesOrderId}</div>
                <div>Total quantity: {totalQuantity}</div>
              </div>
              <div className="sales-invoice mt-5">
                <div className="sales-order-bill">
                  <div>Bill to:</div>
                  <div>xxxxxxxxxxxx</div>
                  <div>xxxxxxxxxxxx</div>
                  <div>xxxxxxxxxxxx</div>
                </div>
              </div>
              <div className="row invoice-table">
                <Table className="table-content sales-invoice-table delivery-tableHeader">
                  <thead>
                    <tr>
                      <th className="item-name-text">Item name</th>
                      <th>Ordered</th>
                      <th>Packed</th>
                      <th>QTY to pack</th>
                    </tr>
                  </thead>
                  <tbody>
                    {packageDetail &&
                      packageDetail.itemDetails.map((item) => (
                        <tr>
                          <td className="item-name-text">{item.itemName}</td>
                          <td>{item.ordered}</td>
                          <td>{item.packed}</td>
                          <td>{item.quantity}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default PackageDetails;
