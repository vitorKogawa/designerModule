import React, { Fragment, useState } from 'react'
import { Position, Handle } from 'react-flow-renderer';
import { BsFillPencilFill } from 'react-icons/bs';
import './EditorComponentsStyles/CustomNodeComponent.scss';

function CustomNodeComponent({ data }: any) {
  return (
    <Fragment>
      <Handle type='target' id='a' position={Position.Left} style={{ border: 0, background: 'rgba(0,0,0,0.0)', width: 10, height: 10, borderRadius: '50%' }} />
      <Handle type='source' id='b' position={Position.Right} style={{ border: 0, background: 'rgba(0,0,0,0.0)', width: 10, height: 10, top: '40%', borderRadius: '50%' }} />
      <Handle type='source' id='c' position={Position.Right} style={{ border: 0, background: 'rgba(0,0,0,0.0)', width: 10, height: 10, top: '60%', borderRadius: '50%' }} />
      <div className="my-card">
        <div className="my-card-header">
          <BsFillPencilFill onClick={data.onEditClick}/>
        </div>
        <div className="my-card-body">
          <p className="my-card-title">
            <label className="title">{data.title ? data.title : 'Cartão sem nome'}</label>
          </p>
          <div className="tags-wrapper">
            <div className="tags_container">
              {data.tagsArray.map((element: any, i: any) => {
                return (<span style={{ backgroundColor: element.color }} className="tag" key={i}>{element.name}</span>)
              })}
            </div>
          </div>
        </div>
        <div className="my-card-footer">
          <div className="my-card-footer-item pallet-1"></div>
          <div className="my-card-footer-item pallet-2"></div>
          <div className="my-card-footer-item pallet-3"></div>
        </div>
      </div>
    </Fragment>
  )

  // return (
  //   <div className="customNodeContainer">
  //     <Handle type='target' id='a' position={Position.Left} style={{ border: 0, background: 'rgba(0,0,0,0.0)', width: 10, height: 10, borderRadius: '50%' }} />
  //     <Handle type='source' id='b' position={Position.Right} style={{ border: 0, background: 'rgba(0,0,0,0.0)', width: 10, height: 10, top: '40%', borderRadius: '50%' }} />
  //     <Handle type='source' id='c' position={Position.Right} style={{ border: 0, background: 'rgba(0,0,0,0.0)', width: 10, height: 10, top: '60%', borderRadius: '50%' }} />
  //     <div className="body_container">
  //       <label className="title">{data.title ? data.title : 'Cartão sem nome'}</label>
  //       <div className="tags_container">
  //         {data.tagsArray.map((element: any, i: any) => {
  //           return (<span style={{ backgroundColor: element.color }} className="tag" key={i}>{element.name}</span>)
  //         })}
  //       </div>
  //       <span>Descrição - Clique em editar.</span>
  //     </div>
  //     <div className="edit_container">
  //       <div className="edit_button" onClick={data.onEditClick}>
  //         <span>editar</span>
  //       </div>
  //     </div>

  //   </div>
  // );
};

export { CustomNodeComponent }