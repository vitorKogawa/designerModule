import React, { memo, FC, CSSProperties, Fragment } from 'react';
import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';
import { BsLightning } from 'react-icons/bs'
import './../styles/style.scss';

const targetHandleStyle: CSSProperties = { background: '#555' };
const sourceHandleStyleA: CSSProperties = { ...targetHandleStyle, top: 10 };
const sourceHandleStyleB: CSSProperties = { ...targetHandleStyle, bottom: 10, top: 'auto' };

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

const InitialNode: FC<NodeProps> = ({ data, isConnectable }) => {

    return (
        <Fragment>
            <div className="my-card">
                <div className="my-card-header">
                    <BsLightning/>
                </div>
                <div className="my-card-body">
                    <p className="my-card-title">
                        Initial Node
                    </p>
                </div>
                <div className="my-card-footer">
                    <div className="my-card-footer-item pallet-1"></div>
                    <div className="my-card-footer-item pallet-2"></div>
                    <div className="my-card-footer-item pallet-3"></div>
                </div>
            </div>
        </Fragment>
    );
};

export default memo(InitialNode);