import React from 'react';
export default function ConnectionLine ({
  sourceX,
  sourceY,
  sourcePosition,
  targetX,
  targetY,
  targetPosition,
  connectionLineType,
  connectionLineStyle,
} : any){
  return (
    <g>
      <path
        fill="none"
        stroke="#FFF"
        strokeWidth={1.5}
        className="animated"
        d={`M${sourceX},${sourceY} C ${sourceX} ${targetY} ${sourceX} ${targetY} ${targetX},${targetY}`}
      />
      <circle cx={targetX} cy={targetY} fill="#fff" r={3} stroke="#FFF" strokeWidth={1.5} />
    </g>
  );
};