import React, { Fragment, useState } from 'react';
import { BsLightning, BsRecordCircle } from 'react-icons/bs'
import { Position, Handle } from 'react-flow-renderer';
import { EditNodeModal } from '../../Screens/HomeScreen/pages/BuildingGame/components/EditNodeModal/EditNodeModal';
// import './EditorComponentsStyles/CustomNodeComponent.scss'

const CustomNode: React.FC<{ id: number }> = (props) => {
  return (
    <Fragment>
      <div className="card p-0 w-100 border-0 m-0">
        <Handle type='target' id='a' position={Position.Left} />
        <Handle type='source' id='b' position={Position.Right} />
        <Handle type='source' id='c' position={Position.Right} /> 
        {/* <img src="..." className="card-img-top" alt="..." /> */}
        <div className="card-body p-0">
            <button className="btn btn-primary w-25 h-100 p-0">
              <BsLightning/>
            </button>
            <h5 className="card-title my-1">Card title</h5>
          {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
          {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
          <button className="btn btn-pallet-1 w-20 h-100 rounded-pill mx-1"></button>
          <button className="btn btn-pallet-2 w-20 h-100 rounded-pill mx-1"></button>
          <button className="btn btn-pallet-3 w-20 h-100 rounded-pill mx-1"></button>
          <EditNodeModal id={props.id} />
        </div>
      </div>

      {/* <NodeModal id={props.id} /> */}
    </Fragment>
  )
}

export { CustomNode }