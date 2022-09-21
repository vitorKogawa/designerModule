import React, { memo, FC, CSSProperties, Fragment } from 'react';
import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';
import { EditNodeModal } from '../../../../EditNodeModal/EditNodeModal';
// import { BsLightning } from 'react-icons/bs'
import './../styles/style.scss'

const CommonNode: FC<{ id: number }> = (props) => {

    return (
        <div key={props.id}>
            <Handle type='target' id='a' position={Position.Left} />
            <Handle type='source' id='b' position={Position.Right} />
            <Handle type='source' id='c' position={Position.Right} />
            <div className="my-card">
                <div className="my-card-header">
                    {/* <BsLightning/> */}
                    <EditNodeModal id={props.id} />
                </div>
                <div className="my-card-body">
                    <p className="my-card-title">
                        Common Node
                    </p>
                </div>
                <div className="my-card-footer">
                    <div className="my-card-footer-item pallet-1"></div>
                    <div className="my-card-footer-item pallet-2"></div>
                    <div className="my-card-footer-item pallet-3"></div>
                </div>
            </div>
        </div>
    );
};

export default memo(CommonNode);