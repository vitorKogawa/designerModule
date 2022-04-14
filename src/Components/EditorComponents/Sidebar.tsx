import React from 'react';
import './EditorComponentsStyles/Sidebar.css';
import nodeImg from '../../Assets/img/node.png';
import nodeFormImg from '../../Assets/img/nodeForm.jpg';

export default function Sidebar2(){
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
        <div className="NodeCardForm" onDragStart={(event) => onDragStart(event, 'formType')} draggable>
          <img className="ImgStyleForm" alt="node1" src={nodeFormImg}/>
        </div>
      </div> 
    </div>
  );
};