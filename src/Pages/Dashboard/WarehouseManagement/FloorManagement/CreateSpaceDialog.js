import React, { useState, useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../../../Helper/Loader";
import { createSpace } from "../../../../Redux/floorManagement/warehouseSlice";
import { toCamelCase } from "../../../../Helper/toCamelCase";

const CreateSpaceDialog = ({
  openCreateSpaceDialog,
  setOpenCreateSpaceDialog,
  selectedSection,
  setShowSubWarehouse,
  dimensions,
  setDimensions,
  isHighRacksChecked,
  setIsHighRacksChecked,
  isFixedBinChecked,
  setIsFixedBinChecked,
  isStorageChecked,
  setIsStorageChecked,
  warehouseDetails,
}) => {
  const [openAddSectionDialog, setOpenAddSectionDialog] = useState(false);
  const [spaceData, setSpaceData] = useState({
    warehouseId: warehouseDetails?._id,
    category: selectedSection && selectedSection,
    space: [],
  });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  console.log(selectedSection)

  useEffect(() => {
    if (!openCreateSpaceDialog) {
      setIsHighRacksChecked(false);
      setIsFixedBinChecked(false);
      setIsStorageChecked(false);
      setDimensions({ finishedProduct: "", spareParts: "", rawMaterials: "" });
      setSpaceData({
        warehouseId: warehouseDetails?._id,
        category: selectedSection || "",
        space: [],
      });
    }
  }, [openCreateSpaceDialog, selectedSection]);

  const handleDimensionChange = (e, field) => {
    let value = e.target.value;

    // Ensure only numbers and × are allowed
    value = value.replace(/[^0-9×]/g, "");

    let parts = value.split("×").map((part) => part.trim());

    // Remove leading zeros and restrict width/height lengths
    let width = parts[0] ? parts[0].replace(/^0+/, "") : "";
    let height = parts[1] ? parts[1].replace(/^0+/, "") : "";

    if (width.length > 4) {
      width = width.slice(0, 4);
    }
    if (height.length > 4) {
      height = height.slice(0, 4);
    }

    // Formatting the display value
    if (width && !height) {
      value = `${width} × `;
    } else if (width && height) {
      value = `${width} × ${height}`;
    } else {
      value = width;
    }

    // Update the dimensions
    setDimensions((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Update the space data with the dimensions
    setSpaceData((prev) => {
      const updatedSpaces = prev.space.map((s) =>
        s.spaceName === field ? { ...s, width, height } : s
      );

      return {
        ...prev,
        space: updatedSpaces,
      };
    });
  };

  const handleCheckboxChange = (field, checked, spaceName) => {
    if (checked) {
      setSpaceData((prev) => ({
        ...prev,
        space: [...prev.space, { spaceName, width: 0, height: 0 }],
      }));
    } else {
      setSpaceData((prev) => ({
        ...prev,
        space: prev.space.filter((s) => s.spaceName !== spaceName),
      }));
    }
  };

  const handleDialogSubmit = () => {
    const updatedSpaceData = {
      ...spaceData,
      category: toCamelCase(selectedSection || ""),
    };
  
    setSpaceData(updatedSpaceData);  
  
    setTimeout(() => {
      setLoading(true)
      dispatch(createSpace(updatedSpaceData))
        .unwrap()
        .then((response) => {
          setLoading(false)
          toast.success(response.message, {
            position: "top-center",
            autoClose: 1000,
            closeButton: false,
          });
          setOpenCreateSpaceDialog(false);
          setShowSubWarehouse(true);
        })
        .catch((error) => {
          toast.error("Failed to create space.");
        });
    }, 0);  
  };
  

  return (
    <div>
      {loading ? (
        <Loader isLoading={loading} />
      ) : (
        <Dialog
          open={openCreateSpaceDialog}
          onClose={() => setOpenCreateSpaceDialog(false)}
          aria-describedby="alert-dialog-slide-description"
          sx={{
            "& .MuiDialog-paper": {
              width: "600px",
              maxWidth: "80vw",
              height: "600px",
            },
          }}
        >
          <DialogTitle className="purchase-list" sx={{ padding: 0 }}>
            <h2>{selectedSection}</h2>
          </DialogTitle>
          <DialogContent>
            <div className="d-md-flex mt-3 mb-3 justify-content-between">
              <p>Select section</p>
              <p
                className="addSpace-btn"
                onClick={() => setOpenAddSectionDialog(true)}
              >
                Add section
              </p>
            </div>

            <div className="d-md-flex gap-3 mb-3">
              <div className="d-flex align-items-center gap-2">
                <input
                  type="checkbox"
                  checked={isHighRacksChecked}
                  onChange={() => {
                    setIsHighRacksChecked(!isHighRacksChecked);
                    handleCheckboxChange(
                      "finishedProduct",
                      !isHighRacksChecked,
                      "High racks"
                    );
                  }}
                />
                <p style={{margin: 0}}>High racks</p>
              </div>

              <div className="d-flex align-items-center gap-2">
                <input
                  type="checkbox"
                  checked={isFixedBinChecked}
                  onChange={() => {
                    setIsFixedBinChecked(!isFixedBinChecked);
                    handleCheckboxChange(
                      "spareParts",
                      !isFixedBinChecked,
                      "Fixed bin"
                    );
                  }}
                />
                <p style={{margin: 0}}>Fixed bin</p>
              </div>

              <div className="d-flex align-items-center gap-2">
                <input
                  type="checkbox"
                  checked={isStorageChecked}
                  onChange={() => {
                    setIsStorageChecked(!isStorageChecked);
                    handleCheckboxChange(
                      "rawMaterials",
                      !isStorageChecked,
                      "Bulk storage"
                    );
                  }}
                />
                <p style={{margin: 0}}>Bulk storage</p>
              </div>
            </div>

            {(isHighRacksChecked || isFixedBinChecked || isStorageChecked) && (
              <p className="fw-bold">Size Customization</p>
            )}

            {spaceData.space.map((s, index) => (
              <div key={index} className="col-md-8 col-12 mb-4">
                <Form.Group className="d-md-flex align-items-center">
                  <Form.Label className="custom-label col-md-6">
                    {s.spaceName} Floor
                  </Form.Label>
                  <InputGroup className="mt-2">
                    <Form.Control
                      className="custom-textfield"
                      placeholder="Width × Height"
                      value={`${s.width} × ${s.height}`}
                      onChange={(e) => handleDimensionChange(e, s.spaceName)}
                    />
                  </InputGroup>
                </Form.Group>
              </div>
            ))}
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
              onClick={() => setOpenCreateSpaceDialog(false)}
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
      )}
    </div>
  );
};

export default CreateSpaceDialog;
