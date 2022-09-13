import React from "react";
import {} from "react-flow-renderer";
import "./styles/style.scss";

const DragAndDrop: React.FC = () => {
  const onDragStart = (event: any, nodeType: any) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="dnd-wrapper">
      {/* <div
        className="dnd-node"
        onDragStart={(event) => onDragStart(event, "initialNode")}
        draggable
      >
        Initial Node
      </div> */}
      <div
        className="dnd-node"
        onDragStart={(event) => onDragStart(event, "special")}
        draggable
      >
        Common Node
      </div>
      {/* <div
        className="dnd-node"
        onDragStart={(event) => onDragStart(event, "finalNode")}
        draggable
      >
        Final Node
      </div> */}
    </div>
  );
};

export { DragAndDrop };
