import React, { useState } from 'react'
import { Position, Handle } from 'react-flow-renderer';
import './EditorComponentsStyles/CustomNodeComponent.css';

function CustomNodeComponent({ data }: any){
  return (
    <div className="customNodeContainer">
        <Handle type='target' id='a' position={Position.Left} style={{border: 0, background: 'rgba(0,0,0,0.0)', width: 10, height: 10, borderRadius: '50%' }} />
        <Handle type='source' id='b' position={Position.Right} style={{border: 0, background: 'rgba(0,0,0,0.0)', width: 10, height: 10, top: '40%', borderRadius: '50%' }} />
        <Handle type='source' id='c' position={Position.Right} style={{border: 0, background: 'rgba(0,0,0,0.0)', width: 10, height: 10, top: '60%', borderRadius: '50%' }} />
      <div className="body_container">
        <label className="title">{data.title? data.title : 'Cartão sem nome'}</label>
        <div className="tags_container">
          {data.tagsArray.map((element: any, i:any) => {
            return (<span style={{backgroundColor: element.color}} className="tag" key={i}>{element.name}</span>)
          })}
        </div>
        <span>Descrição - Clique em editar.</span>
      </div>
      <div className="edit_container">
        <div className="edit_button" onClick={data.onEditClick}>
          <span>editar</span>
        </div> 
      </div>
      
    </div>
  );
};

export { CustomNodeComponent }