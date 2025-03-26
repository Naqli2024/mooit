import React, { useState, lazy, Suspense, useEffect } from "react";
import CreateFloorManagement from "../../../../assests/images/floorManagement.svg";
import { useDispatch, useSelector } from "react-redux";
import { getAllWarehouses } from "../../../../Redux/floorManagement/warehouseSlice";
import FloorManagementOverView from "./FloorManagementOverView";
const NewFloorManagement = lazy(() => import("./NewFloorManagement"));

const FloorManagement = () => {
  const [openNewFloorManagement, setOpenNewFloorManagement] = useState(false);
  const [openFloorManagementOverview, setOpenNewFloorManagementOverview] =
    useState(false);
  const { data } = useSelector((state) => state.warehouse) || {};
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllWarehouses());
    if (data?.length >0) {
      setOpenNewFloorManagementOverview(true);
    }
  }, [dispatch, data]);

  return (
    <div>
      {/* Combined Conditional Rendering */}
      {openFloorManagementOverview ? (
        <FloorManagementOverView />
      ) : openNewFloorManagement ? (
        <Suspense fallback={<p className="lazy-loading-text">Loading New Floor Management...</p>}>
          <NewFloorManagement backToList={() => setOpenNewFloorManagement(false)} />
        </Suspense>
      ) : (
        <div className="purchase-list">
          <h2>Floor Management</h2>
          <div className="card-container">
            <div
              className="create-floor"
              onClick={() => setOpenNewFloorManagement(true)}
            >
              <img
                src={CreateFloorManagement}
                alt="floor-management"
                className="mb-4"
              />
              <p className="personAvatar ms-2">+</p>
              <p className="mt-3">Create</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloorManagement;
