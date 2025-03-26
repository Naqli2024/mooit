import React, { useEffect, useState } from "react";
import RackImage from "../../../../assests/images/rack.svg";
import Draggable from 'react-draggable';

const RearrangeRacks = ({ noOfRacks, onSave, initialLayout, childRef }) => {
  const [availableRacks, setAvailableRacks] = useState(
    Array.from({ length: noOfRacks }, (_, index) => ({
      id: index + 1,
      name: `Rack ${index + 1}`,
    }))
  );

  const [droppedRacks, setDroppedRacks] = useState(
    initialLayout
      ? initialLayout.map((rack) => ({
          ...rack,
          position: { x: rack.x, y: rack.y },
        }))
      : []
  );

  useEffect(() => {
    if (initialLayout && initialLayout.length > 0) {
      const usedRackIds = initialLayout.map((rack) =>
        parseInt(rack.id.split('-')[0])
      );
      setAvailableRacks((prev) =>
        prev.filter((rack) => !usedRackIds.includes(rack.id))
      );
    }
  }, [initialLayout]);

  const handleRackDrop = (rack) => {
    setAvailableRacks((prev) => prev.filter((r) => r.id !== rack.id));
    setDroppedRacks((prev) => [
      ...prev,
      {
        ...rack,
        id: `${rack.id}-${Date.now()}`,
        position: { x: 0, y: 0 },
      },
    ]);
  };

  const handleDrag = (data, rackId) => {
    setDroppedRacks((prevRacks) =>
      prevRacks.map((rack) => {
        if (rack.id === rackId) {
          return {
            ...rack,
            position: { x: data.x, y: data.y },
          };
        }
        return rack;
      })
    );
  };

  const handleSave = () => {
    onSave(
      droppedRacks.map((rack) => ({
        id: rack.id,
        x: rack.position.x,
        y: rack.position.y,
      }))
    );
  };

  return (
    <>
      <div className="rearrange-rack">
        <div className="rearrange-container">
          {availableRacks.length > 0 ? (
            availableRacks.map((rack) => (
              <div
                key={rack.id}
                className="rearrange-racks"
                onClick={() => handleRackDrop(rack)}
              >
                <span>{rack.name}</span>
              </div>
            ))
          ) : (
            <div className="no-racks">No Racks</div>
          )}
        </div>

        <div
          className="drag-drop-area"
          ref={childRef}
          style={{
            paddingTop: '40px',
            position: 'relative',
          }}
        >
          {droppedRacks.map((rack) => {
            const rackIndex = parseInt(rack.id.split('-')[0]) - 1; // Extract index from ID
            const rackName = `Rack ${rackIndex + 1}`; // Derive name
            return (
              <Draggable
                key={rack.id}
                position={rack.position}
                onStop={(e, data) => handleDrag(data, rack.id)}
              >
                <div className="dropped-rack">
                  <img src={RackImage} alt={rackName} title={rackName} />
                  <span className="rack-name">{rackName}</span>
                </div>
              </Draggable>
            );
          })}
        </div>
      </div>
      <div className="d-flex justify-content-end m-2">
        <button className="btn btn-primary" onClick={handleSave}>
          Save
        </button>
      </div>
    </>
  );
};

export default RearrangeRacks;
