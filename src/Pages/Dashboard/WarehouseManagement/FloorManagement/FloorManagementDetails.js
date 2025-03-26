import React, { useState, lazy, Suspense, useEffect } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
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
const WarehouseStructure = lazy(() => import("./WarehouseStructure"));
const WarehouseInfo = lazy(() => import("./WarehouseInfo"));
const Equipment = lazy(() => import("./Equipment"));

const FloorManagementDetails = ({backToList, warehouseDetails}) => {
  const [activeTab, setActiveTab] = useState("Warehouse info");
  const [openAddSpaceDialog, setOpenAddSpaceDialog] = useState(false);
  const { spaceConfiguration } = warehouseDetails || {};
  const [showAddSpace, setShowAddSpace] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case "Warehouse info":
        return <WarehouseInfo />;
      case "Equipment":
        return <Equipment />;
      case "Warehouse structure":
        return <WarehouseStructure warehouseDetails={warehouseDetails}/>;
      default:
        return <WarehouseInfo />;
    }
  };

   useEffect(() => {
      if (spaceConfiguration) {
        const allSpaces = [
          ...(spaceConfiguration?.finishedProduct?.spaces || []),
          ...(spaceConfiguration?.spareParts?.spaces || []),
          ...(spaceConfiguration?.rawMaterials?.spaces || [])
        ];
    
        const hasSpaceWithRacks = allSpaces.find(space => space?.noOfRacks !== undefined);
        setShowAddSpace(!hasSpaceWithRacks);
      }
      }, [spaceConfiguration]);


  return (
    <div className="purchase-list">
      <h2>Floor Management</h2>
      <button onClick={backToList} className="goBack-btn">
        <span>
          <ArrowBackIosIcon />
        </span>
        Back
      </button>
      <div className="edit-print-del-btn justify-content-between">
        <div className="d-md-flex">
        <div
          className={`action-btn ${
            activeTab === "Warehouse info" ? "active-tab" : ""
          }`}
          onClick={() => setActiveTab("Warehouse info")}
        >
          Warehouse Info
        </div>
        <div className="divider"></div>
        <div
          className={`action-btn ${
            activeTab === "Equipment" ? "active-tab" : ""
          }`}
          onClick={() => setActiveTab("Equipment")}
        >
          Equipment
        </div>
        <div className="divider"></div>
        <div
          className={`action-btn ${
            activeTab === "Warehouse structure" ? "active-tab" : ""
          }`}
          onClick={() => setActiveTab("Warehouse structure")}
        >
          Warehouse Structure
        </div>
        <div className="divider"></div>
        </div>
         {activeTab === "Warehouse structure" && showAddSpace && (
          <div className="addSpace-btn" onClick={() => setOpenAddSpaceDialog(true)}>
            Add Space
          </div>
        )}
      </div>
      <Suspense
        fallback={
          <div className="lazy-loading-text">
            Loading...
          </div>
        }
      >
        {renderContent()}
        <Dialog
        open={openAddSpaceDialog}
        onClose={() => setOpenAddSpaceDialog(false)}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          "& .MuiDialog-paper": {
            width: "400px",
            maxWidth: "80vw",
          },
        }}
      >
        <DialogTitle className="purchase-list" sx={{ padding: 0 }}>
          <h2>Add Space</h2>
        </DialogTitle>
        <DialogContent>
          <div className="d-md-flex gap-3 mb-3">
          </div>
            <div className=" col-12 mb-4">
              <Form.Group className="d-md-flex align-items-center">
                <Form.Label className="custom-label col-md-6 mt-3">
                  Product Name
                </Form.Label>
                <InputGroup className="mt-2">
                  <Form.Control
                    className="custom-textfield"
                  />
                </InputGroup>
              </Form.Group>
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
            // onClick={handleDialogSubmit}
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
            onClick={() => setOpenAddSpaceDialog(false)}
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
      </Suspense>
    </div>
  );
};

export default FloorManagementDetails;
