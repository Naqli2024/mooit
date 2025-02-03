import React from "react";
import { BiLoader } from "react-icons/bi";

const Loader = ({ isLoading }) => {
  if (!isLoading) {
    return null; // Return null if not loading
  }

  return (
    <div className="loader-overlay">
      <div className="loader">
        <BiLoader className="spinner" />
      </div>
    </div>
  );
};

export default Loader;