import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const PurchaseDetails = ({ backToList }) => {
  return (
    <div>
      <button onClick={backToList} className="goBack-btn">
        <span>
          <ArrowBackIosIcon />
        </span>
        Back
      </button>
    </div>
  );
};

export default PurchaseDetails;
