import React, { memo, FC, CSSProperties, Fragment } from 'react';
import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';
// import { BsLightning } from 'react-icons/bs'
import './../styles/style.scss'

const targetHandleStyle: CSSProperties = { background: '#555' };
const sourceHandleStyleA: CSSProperties = { ...targetHandleStyle, top: 10 };
const sourceHandleStyleB: CSSProperties = { ...targetHandleStyle, bottom: 10, top: 'auto' };

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const CommonNode: FC<NodeProps> = ({ data, isConnectable }) => {

    return (
        <div key={data.id}>
            <Handle type="target" position={Position.Left} style={targetHandleStyle} onConnect={onConnect} />
            <div className="my-card">
                <div className="my-card-header">
                    {/* <BsLightning/> */}
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
            <Handle
                type="source"
                position={Position.Right}
                id="a"
                style={sourceHandleStyleA}
                isConnectable={isConnectable}
                onMouseDown={(e) => {
                    console.log('You trigger mousedown event', e);
                }}
            />
            <Handle type="source" position={Position.Right} id="b" style={sourceHandleStyleB} isConnectable={isConnectable} />
        </div>
    );
};

export default memo(CommonNode);