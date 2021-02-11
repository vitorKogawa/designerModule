import { Position, Handle, HandleType } from 'react-flow-renderer';
import { handleRight, handleTop, handleLeft } from './Data/data'

function CustomNodeComponent({ data }: any){

  const customNodeStyles = {
    background: '#9CA8B3',
    color: '#FFF',
    padding: 10,
  };
  
  return (
    <div style={customNodeStyles}>
      {handleLeft.map((item: any, index: any) => {
        return <Handle key={index} type={item.type as HandleType} id={item.id} position={Position.Left} style={{border: 0, background: 'rgba(0,0,0,0.0)', width: 10, height: 10, top: item.position, borderRadius: '50%' }} />
      })}
      {handleTop.map((item: any, index: any) => {
        return <Handle key={index} type={item.type as HandleType} id={item.id} position={Position.Top} style={{border: 0, background: 'rgba(0,0,0,0.0)', width: 10, height: 10, left: item.position, borderRadius: '50%' }} />
      })}
      {handleRight.map((item: any, index: any) => {
        return <Handle key={index} type={item.type as HandleType} id={item.id} position={Position.Right} style={{border: 0, background: 'rgba(0,0,0,0.0)', width: 10, height: 10, top: item.position, borderRadius: '50%' }} />
      })}

      <div>{data.text}</div>
      <p>Imagem:</p>
      <input type="file" />
      <p>História:</p>
      <textarea onChange={data.onChange}/>
    </div>
  );
};

export default CustomNodeComponent;