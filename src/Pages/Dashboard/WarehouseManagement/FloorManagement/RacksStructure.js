import React, { useState, lazy, Suspense, useEffect, useRef } from "react";
import RackImage from "../../../../assests/images/rack.svg";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import Draggable from 'react-draggable';

const RearrangeRacks = lazy(() => import("./RearrangeRacks"));

const RacksStructure = ({ noOfRacks }) => {
  const [selectedRacks, setSelectedRacks] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showSelectAll, setShowSelectAll] = useState(false);
  const [openRearrangeRacks, setOpenRearrangeRacks] = useState(false);
  const [savedLayout, setSavedLayout] = useState([]);

  useEffect(() => {
    const storedLayout = localStorage.getItem('rackLayout');
    if (storedLayout) {
      setSavedLayout(JSON.parse(storedLayout));
    }
  }, []);

  const handleSelectRack = (index) => {
    let updatedSelection;
    if (selectedRacks.includes(index)) {
      updatedSelection = selectedRacks.filter((i) => i !== index);
    } else {
      updatedSelection = [...selectedRacks, index];
    }

    setSelectedRacks(updatedSelection);
    setShowSelectAll(updatedSelection.length > 0);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRacks([]);
      setShowSelectAll(false);
    } else {
      setSelectedRacks(Array.from({ length: noOfRacks }, (_, i) => i));
      setShowSelectAll(true);
    }
    setSelectAll(!selectAll);
  };

  const handleSaveLayout = (layout) => {
    localStorage.setItem('rackLayout', JSON.stringify(layout));
    setSavedLayout(layout);
    setOpenRearrangeRacks(false);
  };

  return (
    <div>
      {openRearrangeRacks ? (
        <Suspense fallback={<p className="lazy-loading-text">Loading...</p>}>
          <RearrangeRacks
            noOfRacks={noOfRacks}
            onSave={handleSaveLayout}
            initialLayout={savedLayout}
          />
        </Suspense>
      ) : (
        <div>
          <div className="d-flex justify-content-end gap-3 mt-3">
            <p
              className="addSpace-btn"
              onClick={() => setOpenRearrangeRacks(true)}
            >
              Rearrange
            </p>
            <p className="addSpace-btn">Add Rack</p>
          </div>
          {showSelectAll && (
            <div className="select-all-container">
              <p className="mb-0" onClick={handleSelectAll}>
                {!selectAll ? 'Select All' : 'Unselect'}
              </p>
            </div>
          )}
          {savedLayout.length > 0 ? (
            <div className="racks-container">
              {savedLayout.map((rack) => {
                const rackIndex = parseInt(rack.id.split('-')[0]) - 1;
                const rackName = `Rack ${rackIndex + 1}`;
                return (
                  <Draggable key={rack.id} position={{ x: rack.x, y: rack.y }}>
                    <div className="dropped-rack">
                      <img src={RackImage} alt={rackName} />
                      <span className="rack-name">{rackName}</span>
                    </div>
                  </Draggable>
                );
              })}
            </div>
          ) : (
            <div className="racks-container">
              {Array.from({ length: noOfRacks }, (_, index) => (
                <div key={index} className="racksBox">
                  <input
                    type="checkbox"
                    checked={selectedRacks.includes(index)}
                    onChange={() => handleSelectRack(index)}
                    className="rack-checkbox"
                  />
                  <span>Rack {index + 1}</span>
                  <img src={RackImage} alt="rack" className="rack-image" />
                  {selectedRacks.includes(index) && (
                    <div className="rack-icons">
                      <FaRegEdit className="cursor-pointer text-primary" />
                      <RiDeleteBin5Line className="cursor-pointer text-danger" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RacksStructure;
