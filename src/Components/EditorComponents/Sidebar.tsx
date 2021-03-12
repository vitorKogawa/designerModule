import React from 'react';
import './EditorComponentsStyles/Sidebar.css';
import nodeImg from '../../Assets/img/node.png';

export default function Sidebar(){
  const onDragStart = (event: any, nodeType: any) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
  return (
    <div className="SidebarContainer">
      <div className="SidebarSubContainer">
        <div className="NodeCard" onDragStart={(event) => onDragStart(event, 'special')} draggable>
          <img className="ImgStyle" alt="node1" src={nodeImg}/>
        </div>
      </div> 
    </div>
  );
};