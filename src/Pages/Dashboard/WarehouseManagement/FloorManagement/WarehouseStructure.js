import React, { useState, lazy, Suspense, useEffect } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import RacksStructure from "./RacksStructure";
const CreateSpaceDialog = lazy(() => import("./CreateSpaceDialog"));
const SubWarehouseStructure = lazy(() => import("./SubWarehouseStructure"));

const WarehouseStructure = ({ warehouseDetails }) => {
  const [openCreateSpaceDialog, setOpenCreateSpaceDialog] = useState(false);
  const [selectedSection, setSelectedSection] = useState("");
  const [showSubWarehouse, setShowSubWarehouse] = useState(false);
  const [dimensions, setDimensions] = useState({
    finishedProduct: "",
    spareParts: "",
    rawMaterials: "",
  });
  const [isHighRacksChecked, setIsHighRacksChecked] = useState(false);
  const [isFixedBinChecked, setIsFixedBinChecked] = useState(false);
  const [isStorageChecked, setIsStorageChecked] = useState(false);
  const { spaceConfiguration } = warehouseDetails || {};
  const [spaceExist, setSpaceExist] = useState(false);

  // Handle dialog opening
  const handleDialog = (section) => {
    console.log("selectedSection:", section)
    setSelectedSection(section);
    setOpenCreateSpaceDialog(true);
  };

  // Prepare the items array
  const items = [];
  if (
    spaceConfiguration?.finishedProduct?.width > 0 ||
    spaceConfiguration?.finishedProduct?.height > 0
  ) {
    items.push({
      name: "finishedProduct",
      config: spaceConfiguration.finishedProduct,
    });
  }
  if (
    spaceConfiguration?.rawMaterials?.width > 0 ||
    spaceConfiguration?.rawMaterials?.height > 0
  ) {
    items.push({
      name: "rawMaterials",
      config: spaceConfiguration.rawMaterials,
    });
  }
  if (
    spaceConfiguration?.spareParts?.width > 0 ||
    spaceConfiguration?.spareParts?.height > 0
  ) {
    items.push({
      name: "spareParts",
      config: spaceConfiguration.spareParts,
    });
  }

  // Check if spaces exist
  // useEffect(() => {
  //   const { finishedProduct, rawMaterials, spareParts } = warehouseDetails?.spaceConfiguration || {};
  //   if (
  //     (finishedProduct?.spaces?.length > 0) ||
  //     (rawMaterials?.spaces?.length > 0) ||
  //     (spareParts?.spaces?.length > 0)
  //   ) {
  //     setSpaceExist(true);
  //   } else {
  //     setSpaceExist(false);
  //   }
  // }, [warehouseDetails]);

  // Console log for debugging
  useEffect(() => {
    console.log("Show SubWarehouse:", showSubWarehouse);
  }, [showSubWarehouse]);

  useEffect(() => {
    if (spaceConfiguration) {
      const hasSpaces = 
        (spaceConfiguration?.finishedProduct?.spaces?.length || 0) > 0 ||
        (spaceConfiguration?.spareParts?.spaces?.length || 0) > 0 ||
        (spaceConfiguration?.rawMaterials?.spaces?.length || 0) > 0;
  
      setShowSubWarehouse(hasSpaces);
    }
  }, [spaceConfiguration]);

  // Display logic with conditional rendering
  const renderContent = () => {
    if (showSubWarehouse) {
      return (
        <SubWarehouseStructure
          dimensions={dimensions}
          isHighRacksChecked={isHighRacksChecked}
          isFixedBinChecked={isFixedBinChecked}
          isStorageChecked={isStorageChecked}
        />
      );
    }

    if (spaceExist) {
      return (
        <RacksStructure
          noOfRacks={
            warehouseDetails?.spaceConfiguration?.finishedProduct?.spaces?.[0]?.noOfRacks ||
            warehouseDetails?.spaceConfiguration?.rawMaterials?.spaces?.[0]?.noOfRacks ||
            warehouseDetails?.spaceConfiguration?.spareParts?.spaces?.[0]?.noOfRacks
          }
        />
      );
    }

    return (
      <>
        <CreateSpaceDialog
          openCreateSpaceDialog={openCreateSpaceDialog}
          setOpenCreateSpaceDialog={setOpenCreateSpaceDialog}
          selectedSection={selectedSection}
          setShowSubWarehouse={setShowSubWarehouse}
          dimensions={dimensions}
          setDimensions={setDimensions}
          isHighRacksChecked={isHighRacksChecked}
          setIsHighRacksChecked={setIsHighRacksChecked}
          isFixedBinChecked={isFixedBinChecked}
          setIsFixedBinChecked={setIsFixedBinChecked}
          isStorageChecked={isStorageChecked}
          setIsStorageChecked={setIsStorageChecked}
          warehouseDetails={warehouseDetails}
        />

        <div className="warehouse-structure">
          {items.length === 0 ? (
            <div className="empty-structure">
              <p>No spaces configured.</p>
            </div>
          ) : (
            <div className="col-md-12 d-md-flex">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`col-md-${items.length === 1 ? "12" : "6"} ${
                    item.name === "finishedProduct"
                      ? "first-space"
                      : item.name === "rawMaterials"
                      ? "second-space"
                      : item.name === "spareParts"
                      ? "third-space"
                      : ""
                  }`}
                >
                  <div className="structure-icons">
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        (e.target.parentNode.style.opacity = e.target.checked ? "1" : "")
                      }
                    />
                    <RiDeleteBin5Line />
                    <FaRegEdit />
                  </div>
                  <p>{item.name}</p>
                  <p
                    className="personAvatar ms-2 cursor-pointer"
                    onClick={() => handleDialog(item.name)}
                  >
                    +
                  </p>
                  <p>Create Spaces</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div>
      <Suspense fallback={<div className="lazy-loading-text">Loading...</div>}>
        {renderContent()}
      </Suspense>
    </div>
  );
};

export default WarehouseStructure;
