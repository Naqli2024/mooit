import React, { useState, lazy, Suspense, useEffect, useMemo } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { InputGroup, Form } from "react-bootstrap";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Slide,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createSpaceStructure } from "../../../../Redux/floorManagement/warehouseSlice";
import { toast, ToastContainer } from "react-toastify";
const RacksStructure = lazy(() => import("./RacksStructure"));


const SubWarehouseStructure = ({
  dimensions,
  isHighRacksChecked,
  isFixedBinChecked,
  isStorageChecked,
}) => {
  const [openSubCreateSpaceDialog, setOpenSubCreateSpaceDialog] = useState(false);
  const [openRacksStructure, setOpenRacksStructure] = useState(false);
  const [selectedSection, setSelectedSection] = useState("");

  const { data } = useSelector((state) => state.warehouse) || {};
  const warehouse = Array.isArray(data) ? data[0] : data?.warehouse || {};
  const { spaceConfiguration } = warehouse || {};

  const dispatch = useDispatch();

  const [spaceData, setSpaceData] = useState({
    warehouseId: warehouse?._id,
    category: "",
    spaceName: "",
    noOfRacks: null,
    noOfStacks: null,
    noOfLevels: null,
    boxPerPallet: null,
    palletPerUnit: null,
  });

  const handleDialog = (section) => {
    setSelectedSection(section);
    setOpenSubCreateSpaceDialog(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSpaceData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDialogSubmit = () => {
    const racksCount = parseInt(spaceData?.noOfRacks, 10);
    if (!isNaN(racksCount) && racksCount > 0) {
      setOpenRacksStructure(true);
      setOpenSubCreateSpaceDialog(false);
    }
    console.log(spaceData);
    dispatch(createSpaceStructure(spaceData))
      .unwrap()
      .then((response) => {
        toast.success(response.message, {
          position: "top-center",
          autoClose: 1000,
          closeButton: false,
        });
      })
      .catch((error) => toast.error(error));
  };

  useEffect(() => {
    if (spaceConfiguration) {
      const allSpaces = [
        ...(spaceConfiguration?.finishedProduct?.spaces || []),
        ...(spaceConfiguration?.spareParts?.spaces || []),
        ...(spaceConfiguration?.rawMaterials?.spaces || [])
      ];
  
      const spaceWithRacks = allSpaces.find(space => space?.noOfRacks !== undefined);
  
      if (spaceWithRacks) {
        setOpenRacksStructure(true);
  
        // Update spaceData with noOfRacks and warehouseId
        setSpaceData(prevData => ({
          ...prevData,
          warehouseId: warehouse?._id,
          noOfRacks: spaceWithRacks.noOfRacks
        }));
      } else {
        setOpenRacksStructure(false);
      }
    }
  }, [spaceConfiguration, warehouse]);

  // Calculate widths based on warehouse configuration
  useEffect(() => {
    const categories = ["finishedProduct", "spareParts", "rawMaterials"];
    
    categories.forEach(category => {
      const spaces = spaceConfiguration?.[category]?.spaces || [];
      spaces.forEach(space => {
        if (["High racks", "Fixed bin", "Bulk storage"].includes(space.spaceName)) {
          setSpaceData(prev => ({
            ...prev,
            category: category,
            spaceName: space.spaceName,
          }));
        }
      });
    });
  }, [spaceConfiguration]); 
  
  const widths = useMemo(() => {
    const getWidth = (name) => {
      for (const category of ["finishedProduct", "spareParts", "rawMaterials"]) {
        const spaces = spaceConfiguration?.[category]?.spaces || [];
        const space = spaces.find(s => s.spaceName === name);
        if (space) return space.width;
      }
      return 0; // Default if not found
    };
  
    return {
      highRacksWidth: getWidth("High racks"),
      fixedBinWidth: getWidth("Fixed bin"),
      bulkStorageWidth: getWidth("Bulk storage"),
    };
  }, [spaceConfiguration]);

  const { highRacksWidth, fixedBinWidth, bulkStorageWidth } = widths;
  let currentRowWidth = 0;
  let rows = [[]];

  // Function to add elements to the row
const addToRow = (element, width) => {
  if (currentRowWidth + width > 100) {
    rows.push([]);
    currentRowWidth = 0;
  }
  rows[rows.length - 1].push(element);
  currentRowWidth += width;
};

// Explicitly add each section separately
if (isHighRacksChecked) {
  addToRow(
    <div
      className="first-sub-space high-racks"
      style={{ width: `${highRacksWidth}%`}}
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
      <p>High racks</p>
      <p
        className="personAvatar border-white ms-2 cursor-pointer"
        onClick={() => handleDialog("High racks")}
      >
        +
      </p>
      <p>Create Spaces</p>
    </div>,
    highRacksWidth
  );
}

if (isFixedBinChecked) {
  addToRow(
    <div
      className="second-sub-space fixed-bin"
      style={{ width: `${fixedBinWidth}%` }}
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
      <p>Fixed bin</p>
      <p
        className="personAvatar border-white ms-2 cursor-pointer"
        onClick={() => handleDialog("Fixed bin")}
      >
        +
      </p>
      <p>Create Spaces</p>
    </div>,
    fixedBinWidth
  );
}

if (isStorageChecked) {
  addToRow(
    <div
      className="third-sub-space bulk-storage"
      style={{ width: `${bulkStorageWidth}%` }}
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
      <p>Bulk storage</p>
      <p
        className="personAvatar border-white ms-2 cursor-pointer"
        onClick={() => handleDialog("Bulk storage")}
      >
        +
      </p>
      <p>Create Spaces</p>
    </div>,
    bulkStorageWidth
  );
}

  return (
    <div>
    {openRacksStructure ? (<Suspense fallback={<div className="lazy-loading-text">Loading Racks Structure...</div>}>
        <RacksStructure noOfRacks={parseInt(spaceData?.noOfRacks, 10)} />
      </Suspense>)
    : (<div className="warehouse-structure" style={{ height: "100vh" }}>
      {rows.map((row, index) => (
        <div
          key={index}
          className="warehouse-row"
          style={{ display: "flex", width: "100%", flexWrap: "wrap" }}
        >
          {row}
        </div>
      ))}
<Dialog
          open={openSubCreateSpaceDialog}
          onClose={() => setOpenSubCreateSpaceDialog(false)}
          aria-describedby="alert-dialog-slide-description"
          sx={{
            "& .MuiDialog-paper": {
              width: "800px",
              maxWidth: "80vw",
            },
          }}
        >
          <DialogTitle className="purchase-list" sx={{ padding: 0 }}>
            <h2>{selectedSection}</h2>
          </DialogTitle>
          <DialogContent>
            <div className="d-md-flex justify-content-between mb-3">
              <div className=" col-md-3 mb-4">
                <Form.Group>
                  <Form.Label className="custom-label mt-3">
                    No of racks
                  </Form.Label>
                  <InputGroup className="mt-2">
                    <Form.Control className="custom-textfield" name="noOfRacks" value={spaceData.noOfRacks} onChange={handleChange}/>
                  </InputGroup>
                </Form.Group>
              </div>
              <div className=" col-md-3 mb-4">
              <Form.Group>
                  <Form.Label className="custom-label  mt-3">
                    No of stack
                  </Form.Label>
                  <InputGroup className="mt-2">
                    <Form.Control className="custom-textfield" name="noOfStacks" value={spaceData.noOfStacks} onChange={handleChange}/>
                  </InputGroup>
                </Form.Group>
              </div>
              <div className=" col-md-3 mb-4">
                <Form.Group>
                  <Form.Label className="custom-label mt-3">
                    No of level
                  </Form.Label>
                  <InputGroup className="mt-2">
                    <Form.Control className="custom-textfield" name="noOfLevels" value={spaceData.noOfLevels} onChange={handleChange}/>
                  </InputGroup>
                </Form.Group>
              </div>
            </div>
            <div className="d-md-flex gap-5 mb-3">
              <div className=" col-md-3 me-5 mb-4">
                <Form.Group>
                  <Form.Label className="custom-label mt-3">
                    Box per pallet
                  </Form.Label>
                  <InputGroup className="mt-2">
                    <Form.Control className="custom-textfield" name="boxPerPallet" value={spaceData.boxPerPallet} onChange={handleChange}/>
                  </InputGroup>
                </Form.Group>
              </div>
              <div className="col-md-3 mb-4">
              <Form.Group>
                  <Form.Label className="custom-label mt-3">
                    Pallet per unit
                  </Form.Label>
                  <InputGroup className="mt-2">
                    <Form.Control className="custom-textfield" name="palletPerUnit" value={spaceData.palletPerUnit} onChange={handleChange}/>
                  </InputGroup>
                </Form.Group>
              </div>
            </div>
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              gap: "8px",
              padding: "16px",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={handleDialogSubmit}
              sx={{
                fontWeight: "normal",
                paddingTop: "5px",
                paddingBottom: "3px",
                backgroundColor: "#1F3F7F",
                textTransform: "capitalize",
              }}
            >
              Save
            </Button>
            <Button
              onClick={() => setOpenSubCreateSpaceDialog(false)}
              sx={{
                backgroundColor: "#CFCFCF",
                color: "black",
                fontWeight: "normal",
                paddingTop: "5px",
                paddingBottom: "3px",
                textTransform: "capitalize",
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

    </div>)}
    </div>
  );
};


export default SubWarehouseStructure;
